"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { NotFoundError } from "app/lib/errors";
import { db } from "drizzle";

const FetchPendingOrderQuerySchema = z.object({
	confirmationNumber: z.string(),
});
export default async function fetchPendingOrderQuery(
	input: z.infer<typeof FetchPendingOrderQuerySchema>,
) {
	const data = FetchPendingOrderQuerySchema.parse(input);

	const order = await db.query.orders.findFirst({
		where: (orders, { eq }) =>
			eq(orders.confirmationNumber, data.confirmationNumber),
		columns: {
			orderStatus: true,
		},
	});

	if (!order) {
		throw new NotFoundError({
			message: "Order not found",
		});
	}

	if (order.orderStatus !== "pending") {
		redirect("/");
	}

	return order.orderStatus;
}
