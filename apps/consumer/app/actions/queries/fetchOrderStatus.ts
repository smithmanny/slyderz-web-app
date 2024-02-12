"use server";

import { z } from "zod";

import { sendSesEmail } from "app/lib/aws";
import { getStripeServer } from "app/lib/stripe";
import {
	getChefServiceFee,
	getConsumerServiceFee,
	readableDate,
} from "app/lib/utils";
import prisma from "db";

import { TRANSACTIONAL_EMAILS } from "types";

const FetchOrderStatusQuerySchema = z.object({
	confirmationNumber: z.string(),
	status: z.number(),
});
export default async function fetchOrderStatusQuery(
	input: z.infer<typeof FetchOrderStatusQuerySchema>,
) {
	FetchOrderStatusQuerySchema.parse(input);

	const order = await prisma.order.findFirstOrThrow({
		where: {
			confirmationNumber: input.confirmationNumber,
		},
		select: {
			address1: true,
			address2: true,
			city: true,
			state: true,
			zipcode: true,
			amount: true,
			confirmationNumber: true,
			eventDate: true,
			eventTime: true,
			orderStatus: true,
			items: {
				include: {
					dish: {
						select: {
							description: true,
							name: true,
							image: true,
						},
					},
				},
			},
			chefId: true,
			paymentMethodId: true,
			chef: {
				select: {
					stripeAccountId: true,
				},
			},
			user: {
				select: {
					id: true,
					email: true,
					stripeCustomerId: true,
				},
			},
		},
	});

	if (order.orderStatus !== "PENDING") {
		throw new Error("Wrong order status.");
	}

	switch (input.status) {
		case 0: // pending state
			return;
		case 1: // denied state
			await prisma.order.update({
				where: {
					confirmationNumber: order.confirmationNumber,
				},
				data: {
					orderStatus: "DECLINED",
				},
			});

			await sendSesEmail({
				to: order.user.email,
				type: TRANSACTIONAL_EMAILS.denyOrder,
				variables: {
					orderNumber: order.confirmationNumber,
				},
			});
			return;
		case 2:
			{
				// accepted state
				const stripe = getStripeServer();
				const consumerServiceFee = getConsumerServiceFee(order.amount);
				// Stripe amount must be in cents
				const stripeOrderAmount = Number(
					(
						parseFloat(String(order.amount + consumerServiceFee)) * 100
					).toString(),
				);
				const stripeApplicationFee = Number(
					(
						parseFloat(
							String(
								getChefServiceFee(order.amount) +
								getConsumerServiceFee(order.amount),
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
				const updateOrder = prisma.order.update({
					where: {
						confirmationNumber: order.confirmationNumber,
					},
					data: {
						orderStatus: "ACCEPTED",
					},
				});

				await Promise.all([capturePayment, updateOrder]);

				const eventDate = new Date(order.eventDate);
				const address = `${order.address1} ${order.city}, ${order.state} ${order.zipcode}`;

				await sendSesEmail({
					to: order.user.email,
					type: TRANSACTIONAL_EMAILS.confirmOrder,
					variables: {
						orderNumber: order.confirmationNumber,
						orderDate: readableDate(eventDate),
						orderTime: order.eventTime,
						orderLocation: address,
						orderSubtotal: order.amount,
						orderServiceFee: consumerServiceFee,
						orderTotal: order.amount + consumerServiceFee,
						orderItems: order.items.map((d) => ({
							id: d.id,
							quantity: d.quantity,
							description: d.dish.description,
							name: d.dish.name,
							image: d.dish?.image[0]?.imageUrl,
						})),
					},
				});
			}
			return;
		default:
			throw new Error("There is a problem with order.");
	}
}
