"use server";

import { getChefSession } from "app/lib/auth";
import prisma from "db";

export default async function getMenuSectionsQuery() {
	const { chef } = await getChefSession();

	return await prisma.section.findMany({
		where: {
			chefId: chef.id,
		},
	});
}
