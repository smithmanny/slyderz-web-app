"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getChefSession } from "app/lib/auth";
import { sendChefOrderDeniedEmail } from "app/lib/aws";
import { NotFoundError } from "app/lib/errors";
import { readableDate } from "app/lib/utils";
import { db } from "drizzle";
import { orders } from "drizzle/schema/order";

const DenyOrderSchema = z.object({
	confirmationNumber: z.string(),
});
export default async function denyOrderMutation(
	input: z.infer<typeof DenyOrderSchema>,
) {
	const data = DenyOrderSchema.parse(input);
	const { chef } = await getChefSession();

	const order = await db.query.orders.findFirst({
		where: (orders, { eq }) =>
			eq(orders.confirmationNumber, data.confirmationNumber),
		with: {
			dishes: true,
			user: {
				columns: {
					email: true,
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

	return {
		message: "Successfully denied order",
	};
}
