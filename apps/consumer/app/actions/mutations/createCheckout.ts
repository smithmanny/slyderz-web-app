"use server";

import { redirect } from "next/navigation";
import randomstring from "randomstring";
import { z } from "zod";

import { getProtectedSession } from "app/lib/auth";
import { sendSesEmail } from "app/lib/aws";
import { getCartCookie, setCookie } from "app/lib/cookies";
import {
	getChefServiceFee,
	getConsumerServiceFee,
	readableDate,
} from "app/lib/utils";
import { db } from "drizzle";
import { orders } from "drizzle/schema/order";
import { dishesToOrders } from "drizzle/schema/menu";
import { NotFoundError, UnknownError } from "app/lib/errors";

import { TRANSACTIONAL_EMAILS } from "types";

const CreateCheckoutSchema = z.object({
	address: z.string(),
	chefId: z.number(),
	subtotal: z.string(),
	serviceFee: z.string(),
	total: z.string(),
	cartItems: z.array(
		z.object({
			id: z.number(),
			dishId: z.number(),
			chefId: z.number(),
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
	CreateCheckoutSchema.parse(input);

	const { user } = await getProtectedSession();
	const cart = await getCartCookie();

	// verify chef exists before creating order
	const chef = await db.query.chefs.findFirst({
		where: (chefs, { eq }) => eq(chefs.id, input.chefId),
		with: {
			user: true
		}
	});

	if (!chef) {
		throw new Error("Chef not found")
	}

	const order = await db.transaction(async (tx) => {
		const orderConfirmationNumber = `SLY-${randomstring.generate({
			charset: "alphanumeric",
			capitalization: "uppercase",
			length: 7,
		})}`;
		const consumerServiceFee = getConsumerServiceFee(cart.total);
		const cartTotal = cart.total + consumerServiceFee

		try {
			const insertOrder = await tx.insert(orders).values({
				serviceFee: String(consumerServiceFee),
				subtotal: String(cart.total),
				total: String(cartTotal),
				chefId: input.chefId,
				confirmationNumber: orderConfirmationNumber,
				address1: "",
				address2: "",
				state: "",
				city: "",
				zipcode: "",
				eventDate: input.eventDate,
				eventTime: input.eventTime,
				paymentMethodId: input.paymentMethodId,
				userId: user.id,
			}).returning()

			const order = insertOrder[0]

			if (!order) {
				tx.rollback();
				throw new NotFoundError({
					message: "Order not found"
				})
			}

			// create order items
			const orderDishes = input.cartItems.map((item) => ({
				dishId: item.dishId,
				orderId: order.id,
				name: item.name,
				imageUrl: item.imageUrl,
				price: String(item.price),
				quantity: item.quantity,
			}))
			const orderItems = await db.insert(dishesToOrders).values(orderDishes).returning()

			return {
				...order,
				items: {
					...orderItems
				}
			}
		} catch (err) {
			tx.rollback()
			throw new UnknownError({
				message: "Failed to create order",
				cause: err
			})
		}
	});

	// Send email
	if (order?.confirmationNumber) {
		const date = new Date(input.eventDate);
		const acceptUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/confirm`;
		const denyUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/deny`;
		// const chefServiceFee = getChefServiceFee(order.amount);
		const consumerServiceFee = getConsumerServiceFee(cart.total);
		const address = `${order.address1} ${order.city}, ${order.state} ${order.zipcode}`;
		const customerEmailParams = {
			to: user.email,
			type: TRANSACTIONAL_EMAILS.newOrderConsumer,
			variables: {
				// orderNumber: order.confirmationNumber,
				orderDate: readableDate(date),
				orderTime: input.eventTime,
				orderLocation: address,
				// orderSubtotal: order.amount,
				// orderServiceFee: consumerServiceFee,
				orderTotal: order.total,
				orderItems: order.items.map((item) => ({
					quantity: item.quantity,
					price: item.price,
					name: item.name,
					image: item.imageUrl
				})),
			},
		};
		const chefEmailParams = {
			to: chef.user.email,
			type: TRANSACTIONAL_EMAILS.newOrderChef,
			variables: {
				orderApproveUrl: acceptUrl,
				orderDenyUrl: denyUrl,
				orderNumber: order.confirmationNumber,
				orderDate: readableDate(date),
				orderTime: input.eventTime,
				orderLocation: address,
				// orderSubtotal: order.amount,
				// orderServiceFee: chefServiceFee,
				orderTotal: String(Number(order.subtotal) - getChefServiceFee(order.subtotal)),
				orderItems: order.items.map((item) => ({
					quantity: item.quantity,
					price: String(item.price),
					name: item.name,
					image: item.imageUrl
				})),
			},
		};

		// Send email to chef and user
		Promise.all([
			sendSesEmail(customerEmailParams),
			sendSesEmail(chefEmailParams),
		])
			.then(() => console.log("Order confirmation email sent"))
			.catch((err) => {
				console.log("Order confirmation email failed to send", err);
				throw new Error("Email failed to send.");
			});

		const initialUserCart = {
			items: [],
			total: 0,
		};

		setCookie("cart", JSON.stringify(initialUserCart));

		redirect(`/orders/${order.confirmationNumber}/new`);
	}
}
