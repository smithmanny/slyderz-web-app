"use server";

import { and } from "drizzle-orm";

import { getChefSession } from "app/lib/auth";
import { db } from "drizzle";

export default async function getMenuSectionsQuery() {
	const { chef } = await getChefSession();

	return await db.query.sections.findMany({
		where: (sections, { eq }) => and(eq(sections.chefId, chef.id), eq(sections.isActive, true))
	});
}
