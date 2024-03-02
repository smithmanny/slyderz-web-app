"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import {
	sendChefOrderApprovedEmail,
	sendChefOrderDeniedEmail,
} from "app/lib/aws";
import { NotFoundError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";
import {
	getChefServiceFee,
	getConsumerServiceFee,
	readableDate,
} from "app/lib/utils";
import { db } from "drizzle";
import { orders } from "drizzle/schema/order";

const FetchOrderStatusQuerySchema = z.object({
	confirmationNumber: z.string(),
	status: z.number(),
});
export default async function fetchOrderStatusQuery(
	input: z.infer<typeof FetchOrderStatusQuerySchema>,
) {
	FetchOrderStatusQuerySchema.parse(input);

	const order = await db.query.orders.findFirst({
		where: (orders, { eq }) =>
			eq(orders.confirmationNumber, input.confirmationNumber),
		with: {
			dishes: true,
			chef: {
				columns: {
					stripeAccountId: true,
				},
			},
			user: {
				columns: {
					id: true,
					email: true,
					stripeCustomerId: true,
				},
			},
		},
	});

	if (!order) {
		throw new NotFoundError({
			message: "Order not found",
		});
	}

	if (order.orderStatus !== "pending") {
		throw new Error("Wrong order status.");
	}

	switch (input.status) {
		case 0: // pending state
			return;
		case 1: // denied state
			await db
				.update(orders)
				.set({
					orderStatus: "declined",
				})
				.where(eq(orders.id, order.id));

			await sendChefOrderDeniedEmail({
				to: order.user.email,
				data: {
					orderDate: readableDate(new Date(order.eventDate)),
					orderTime: order.eventTime,
					orderLocation: "address",
					orderTotal: order.total,
					orderItems: order.dishes.map((item) => ({
						quantity: item.quantity,
						price: String(item.price),
						name: item.name,
						image: item.imageUrl,
					})),
				},
			});
			return;
		case 2:
			{
				// accepted state
				const stripe = getStripeServer();
				const consumerServiceFee = getConsumerServiceFee(order.subtotal);
				// Stripe amount must be in cents
				const stripeOrderAmount = Number(
					(
						parseFloat(String(order.subtotal + consumerServiceFee)) * 100
					).toString(),
				);
				const stripeApplicationFee = Number(
					(
						parseFloat(
							String(
								getChefServiceFee(order.subtotal) +
									getConsumerServiceFee(order.subtotal),
							),
						) * 100
					).toString(),
				);

				const paymentIntent = await stripe.paymentIntents.create({
					amount: stripeOrderAmount,
					capture_method: "manual",
					currency: "usd",
					customer: order.user.stripeCustomerId,
					payment_method: order.paymentMethodId,
					off_session: true,
					confirm: true,
					application_fee_amount: stripeApplicationFee,
					transfer_data: {
						destination: order.chef.stripeAccountId,
					},
					return_url: process.env.NEXT_PUBLIC_URL,
					metadata: {
						userId: order.user.id,
					},
				});

				if (!paymentIntent) {
					throw new Error("Payment intent not created");
				}

				const capturePayment = stripe.paymentIntents.capture(paymentIntent.id);

				const updateOrder = db
					.update(orders)
					.set({
						orderStatus: "accepted",
					})
					.where(eq(orders.id, order.id));

				await Promise.all([capturePayment, updateOrder]);

				const eventDate = new Date(order.eventDate);
				const address = `${order.address1} ${order.city}, ${order.state} ${order.zipcode}`;

				await sendChefOrderApprovedEmail({
					to: order.user.email,
					data: {
						orderDate: readableDate(eventDate),
						orderTime: order.eventTime,
						orderLocation: address,
						orderTotal: order.total,
						orderItems: order.dishes.map((dish) => ({
							quantity: dish.quantity,
							name: dish.name,
							price: String(dish.price),
							image: dish.imageUrl,
						})),
					},
				});
			}
			return;
		default:
			throw new Error("There is a problem with order.");
	}
}
