"use server";

import { getChefSession } from "app/lib/auth";
import { formatNumberToCurrency } from "app/lib/utils";
import { db } from "drizzle";

export default async function getChefOrdersQuery() {
	const { chef } = await getChefSession();

	const chefOrders = await db.query.orders.findMany({
		where: (orders, { eq, and }) =>
			and(eq(orders.chefId, chef.id), eq(orders.orderStatus, "completed")),
		columns: {
			id: true,
			confirmationNumber: true,
			total: true,
			eventDate: true,
		},
	});

	const revenue = chefOrders.reduce((a, b) => a + Number(b.total), 0);
	const lastFiveOrders = chefOrders.slice(0, 5);

	return {
		count: chefOrders.length,
		orders: lastFiveOrders,
		revenue: formatNumberToCurrency(revenue),
	};
}
