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
import prisma from "db";

import { TRANSACTIONAL_EMAILS } from "types";

const CreateCheckoutSchema = z.object({
	address: z.string(),
	chefId: z.string(),
	cartTotal: z.number(),
	cartItems: z.array(
		z.object({
			id: z.string(),
			dishId: z.string(),
			chefId: z.string(),
			name: z.string(),
			price: z.number(),
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

	const session = await getProtectedSession();
	const cart = await getCartCookie();

	// verify chef exists before creating order
	await prisma.chef.findFirstOrThrow({ where: { id: input.chefId } });

	await prisma.$transaction(async (db) => {
		// Create order
		const orderConfirmationNumber = `SLY-${randomstring.generate({
			charset: "alphanumeric",
			capitalization: "uppercase",
			length: 7,
		})}`;

		const address = await db.address.findFirstOrThrow({
			where: {
				userId: session.user.userId,
			},
		});

		const order = await db.order.create({
			data: {
				amount: Number(cart.total),
				chefId: input.chefId,
				confirmationNumber: orderConfirmationNumber,
				address1: address.address1,
				address2: address.address2 ?? address.address2,
				state: address.state,
				city: address.city,
				zipcode: address.zipcode,
				eventDate: input.eventDate,
				eventTime: input.eventTime,
				items: {
					createMany: {
						data: input.cartItems.map((item) => ({
							dishId: item.dishId,
							quantity: item.quantity,
						})),
					},
				},
				paymentMethodId: input.paymentMethodId,
				userId: session.user.userId,
			},
			select: {
				amount: true,
				items: {
					include: {
						dish: {
							select: {
								name: true,
								price: true,
								image: true,
							},
						},
					},
				},
				confirmationNumber: true,
				id: true,
				address1: true,
				address2: true,
				state: true,
				city: true,
				zipcode: true,
				chef: {
					select: {
						user: {
							select: {
								email: true,
							},
						},
					},
				},
				user: {
					select: {
						email: true,
					},
				},
			},
		});

		// Send email
		if (order?.confirmationNumber) {
			const date = new Date(input.eventDate);
			const acceptUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/confirm`;
			const denyUrl = `${process.env.NEXT_PUBLIC_URL}/orders/${order.confirmationNumber}/deny`;
			const consumerServiceFee = getConsumerServiceFee(order.amount);
			const chefServiceFee = getChefServiceFee(order.amount);
			const address = `${order.address1} ${order.city}, ${order.state} ${order.zipcode}`;
			const customerEmailParams = {
				to: order.user.email,
				type: TRANSACTIONAL_EMAILS.newOrderConsumer,
				variables: {
					// orderNumber: order.confirmationNumber,
					orderDate: readableDate(date),
					orderTime: input.eventTime,
					orderLocation: address,
					// orderSubtotal: order.amount,
					// orderServiceFee: consumerServiceFee,
					orderTotal: String(
						order.amount + getConsumerServiceFee(order.amount),
					),
					orderItems: order.items.map((i) => ({
						quantity: i.quantity,
						price: String(i.dish.price),
						name: i.dish.name,
						// image: i.dish?.image[0]?.imageUrl
					})),
				},
			};
			const chefEmailParams = {
				to: order.chef.user.email,
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
					orderTotal: String(order.amount - getChefServiceFee(order.amount)),
					orderItems: order.items.map((i) => ({
						quantity: i.quantity,
						price: String(i.dish.price),
						name: i.dish.name,
						// image: i.dish?.image[0]?.imageUrl
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
	});
}
