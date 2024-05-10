"use server";

import { eq } from "drizzle-orm";

import { db } from "drizzle";
import { dishes, hours } from "drizzle/schema/menu";
import { chefs, users } from "drizzle/schema/user";

type Chef = typeof chefs.$inferSelect;
interface HomeChef extends Chef {
	user: {
		id: string;
		name: string;
		headshotUrl: string | null;
	};
}
export default async function getHomePageChefs() {
	const rows = await db
		.select()
		.from(chefs)
		.innerJoin(dishes, eq(chefs.id, dishes.chefId))
		.innerJoin(users, eq(chefs.userId, users.id))
		.where(eq(chefs.isOnboardingComplete, true));

	const res = rows.reduce<Array<HomeChef>>((acc, row) => {
		const chef = row.chefs;
		const user = row.users;

		acc.push({
			...chef,
			user: {
				id: user.id,
				name: user.name,
				headshotUrl: user.headshotUrl,
			},
		});

		return acc;
	}, []);

	return res;
}
