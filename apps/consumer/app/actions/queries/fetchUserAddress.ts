import { getProtectedSession } from "app/lib/auth";
import { default as initPrisma } from "db";

export default async function fetchUserAddress() {
	const userSession = getProtectedSession();
	const [session, prisma] = await Promise.all([userSession, initPrisma]);

	const address = await prisma.address.findUniqueOrThrow({
		where: {
			userId: session.user.userId,
		},
	});

	return address;
}
