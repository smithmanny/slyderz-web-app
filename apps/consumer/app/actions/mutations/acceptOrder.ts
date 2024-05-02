"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getChefSession } from "app/lib/auth";
import { sendChefOrderApprovedEmail } from "app/lib/aws";
import { NotFoundError } from "app/lib/errors";
import { getStripeServer } from "app/lib/stripe";
import {
	getChefServiceFee,
	getConsumerServiceFee,
	readableDate,
} from "app/lib/utils";
import { db } from "drizzle";
import { orders } from "drizzle/schema/order";

const acceptOrderSchema = z.object({
	confirmationNumber: z.string(),
});
export default async function acceptOrderMutation(
	input: z.infer<typeof acceptOrderSchema>,
) {
	const data = acceptOrderSchema.parse(input);
	const { chef } = await getChefSession();

	const order = await db.query.orders.findFirst({
		where: (orders, { eq }) =>
			eq(orders.confirmationNumber, data.confirmationNumber),
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

	if (order.orderStatus !== "pending" || chef.id !== order.chefId) {
		redirect("/");
	}

	const stripe = getStripeServer();
	// Stripe amount must be in cents
	const stripeOrderAmount = Number(
		(Number.parseFloat(order.total) * 100).toString(),
	);
	const stripeApplicationFee = Number(
		(
			Number.parseFloat(
				String(
					getChefServiceFee(Number(order.subtotal)) +
						getConsumerServiceFee(Number(order.subtotal)),
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
			updatedAt: new Date().toISOString(),
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

	return {
		message: "Successfully accepted order",
	};
}
