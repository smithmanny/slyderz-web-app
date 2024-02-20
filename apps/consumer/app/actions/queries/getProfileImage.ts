"use server";

import { cache } from "react";

import { db } from "drizzle";

import { getProtectedSession } from "app/lib/auth";
export default cache(async function getProfileImageQuery() {
	const { user } = await getProtectedSession();

	return db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, user.id),
		columns: {
			headshotUrl: true
		}
	});
});
