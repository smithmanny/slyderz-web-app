"use server";

import { cache } from "react";

import prisma from "db";

import { getProtectedSession } from "app/lib/auth";
export default cache(async function getProfileImageQuery() {
	const session = await getProtectedSession();

	return prisma.userPhoto.findFirst({
		where: {
			userId: session.user.userId,
		},
	});
});
