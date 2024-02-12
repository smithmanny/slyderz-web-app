"use server";

import { getChefSession } from "app/lib/auth";
import prisma from "db";

export default async function getMenuDishesQuery() {
	const { chef } = await getChefSession();

	return await prisma.dish.findMany({
		where: {
			chefId: chef.id,
		},
		select: {
			id: true,
			name: true,
			deleted: true,
			price: true,
			section: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
}
