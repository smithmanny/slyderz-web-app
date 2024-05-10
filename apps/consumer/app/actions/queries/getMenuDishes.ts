"use server";

import { getChefSession } from "app/lib/auth";
import { db } from "drizzle";

export default async function getMenuDishesQuery() {
	const { chef } = await getChefSession();

	return await db.query.dishes.findMany({
		where: (dishes, { eq, and }) =>
			and(eq(dishes.chefId, chef.id), eq(dishes.isActive, true)),
		with: {
			section: true,
		},
	});
}
