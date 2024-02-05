import prisma from "db";

import { getProtectedSession } from "app/lib/auth";

export async function GET() {
	const session = await getProtectedSession();
	const profilePic = await prisma.userPhoto.findFirst({
		where: { userId: session.user.userId },
	});

	return Response.json({ imageUrl: profilePic?.imageUrl });
}
