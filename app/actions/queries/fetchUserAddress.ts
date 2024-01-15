import { getPrisma } from "app/lib/prisma";
import { getProtectedSession } from "app/lib/auth";

export default async function fetchUserAddress() {
  const userSession = getProtectedSession()
  const initPrisma = getPrisma()
  const [session, prisma] = await Promise.all([userSession, initPrisma])

  const address = await prisma.address.findUniqueOrThrow({
    where: {
      userId: session.user.userId,
    },
  });

  return address;
}