"use server";

import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getCartQuery } from "app/actions/queries/getCart";
import { getProtectedSession } from "app/lib/auth";
import {
	sendChefOrderRequestEmail,
	sendConsumerNewOrderEmail,
} from "app/lib/aws";
import { NotFoundError, UnknownError } from "app/lib/errors";
import { getConsumerServiceFee, readableDate } from "app/lib/utils";
import { db } from "drizzle";
import { dishesToOrders } from "drizzle/schema/menu";
import { cart, cartItems, orders } from "drizzle/schema/order";

const CreateCheckoutSchema = z.object({
	address: z.string(),
	chefId: z.string(),
	subtotal: z.number(),
	serviceFee: z.number(),
	total: z.number(),
	cartItems: z.array(
		z.object({
			id: z.string(),
			dishId: z.string(),
			chefId: z.string(),
			name: z.string(),
			price: z.number(),
			imageUrl: z.string(),
			quantity: z.number(),
		}),
	),
	eventDate: z.string(),
	eventTime: z.string(),
	paymentMethodId: z.string(),
});
export default async function createCheckoutMutation(
	input: z.infer<typeof CreateCheckoutSchema>,
) {
	const checkout = CreateCheckoutSchema.parse(input);

	const { user } = await getProtectedSession();
	const userCart = await getCartQuery();

	// verify chef exists before creating order
	const chef = await db.query.chefs.findFirst({
		where: (chefs, { eq }) => eq(chefs.id, checkout.chefId),
		with: {
			user: true,
		},
	});

	if (!chef) {
		throw new Error("Chef not found");
	}

	if (checkout.cartItems.length === 0) {
		return;
	}

	const order = await db.transaction(async (tx) => {
		const orderConfirmationNumber = `SLY-${generateId(10)}`;
		const consumerServiceFee = getConsumerServiceFee(userCart.subtotal);

		try {
			const insertOrder = await tx
				.insert(orders)
				.values({
					id: generateId(10),
					serviceFee: consumerServiceFee.toString(),
					subtotal: userCart.subtotal.toString(),
					total: userCart.total.toString(),
					chefId: checkout.chefId,
					confirmationNumber: orderConfirmationNumber,
					address1: "",
					address2: "",
					state: "",
					city: "",
					zipcode: "",
					eventDate: checkout.eventDate,
					eventTime: checkout.eventTime,
					paymentMethodId: checkout.paymentMethodId,
					userId: user.id,
				})
				.returning();

			const order = insertOrder[0];

			if (!order) {
				tx.rollback();
				throw new NotFoundError({
					message: "Order not found",
				});
			}

			// create order items
			const orderDishes = checkout.cartItems.map((item) => ({
				dishId: item.dishId,
				orderId: order.id,
				name: item.name,
				imageUrl: item.imageUrl,
				price: String(item.price),
				quantity: item.quantity,
			}));
			const orderItems = await tx
				.insert(dishesToOrders)
				.values(orderDishes)
				.returning();

			return {
				address: "4288 New Road",
				confirmationNumber: order.confirmationNumber,
				total: order.total,
				items: orderItems,
			};
		} catch (err) {
			tx.rollback();
			throw new UnknownError({
				message: "Failed to create order",
				cause: err,
			});
		}
	});

	const date = new Date(checkout.eventDate);
	const acceptUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/confirm`;
	const denyUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/declined`;
	// const chefServiceFee = getChefServiceFee(order.amount);
	const address = order.address;
	const customerEmailParams = {
		// orderNumber: order.confirmationNumber,
		orderDate: readableDate(date),
		orderTime: checkout.eventTime,
		orderLocation: address,
		// orderSubtotal: order.amount,
		// orderServiceFee: consumerServiceFee,
		orderTotal: order.total,
		orderItems: order.items.map((item) => ({
			quantity: item.quantity,
			price: item.price,
			name: item.name,
			image: item.imageUrl,
		})),
	};
	// TODO
	const chefEmailParams = {
		orderApproveUrl: acceptUrl,
		orderDenyUrl: denyUrl,
		orderNumber: order.confirmationNumber,
		orderDate: readableDate(date),
		orderTime: checkout.eventTime,
		orderLocation: address,
		// orderSubtotal: order.amount,
		// orderServiceFee: chefServiceFee,
		orderTotal: order.total,
		orderItems: order.items.map((item) => ({
			quantity: item.quantity,
			price: item.price,
			name: item.name,
			image: item.imageUrl,
		})),
	};

	// clear cart
	const resetCartItems = db
		.delete(cartItems)
		.where(eq(cartItems.cartId, userCart.id));
	const resetCart = db
		.update(cart)
		.set({
			eventDate: null,
			eventTime: null,
			subtotal: null,
			serviceFee: null,
			total: null,
		})
		.where(eq(cart.id, userCart.id));

	// TODO: send emails with lambda
	Promise.all([
		sendConsumerNewOrderEmail({ to: user.email, data: customerEmailParams }),
		sendChefOrderRequestEmail({ to: chef.user.email, data: chefEmailParams }),
		resetCartItems,
		resetCart,
	])
		.then(() => console.log("Order confirmation email sent"))
		.catch((err) => {
			throw new UnknownError({
				message: "Failed to send email",
				cause: err,
			});
		});

	redirect(`/orders/${order.confirmationNumber}`);
}
