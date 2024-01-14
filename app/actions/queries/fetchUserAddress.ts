import { getPrisma } from "app/lib/prisma";
import { getProtectedSession } from "app/lib/auth";

export default async function fetchUserAddress() {
  const userSession = getProtectedSession()
  const initPrisma = getPrisma()
  const [session, prisma] = await Promise.all([userSession, initPrisma])

  const user = await prisma.authUser.findUniqueOrThrow({
    where: {
      id: session.user.userId,
    },
    select: {
      address: {
        select: {
          id: true,
          address1: true,
          address2: true,
          city: true,
          state: true,
          zipcode: true,
        },
      },
    },
  });

  return user.address;
}