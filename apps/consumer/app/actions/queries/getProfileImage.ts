"use server";

import prisma from "db";

import { getProtectedSession } from "app/lib/auth";
export default async function getProfileImageQuery() {
	const session = await getProtectedSession();

	return prisma.userPhoto.findFirst({
		where: {
			userId: session.user.userId,
		},
	});
}
