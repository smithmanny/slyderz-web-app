"use server"

import { getProtectedSession } from "app/lib/auth";
import { db } from "drizzle";

export default async function getUserAddressQuery() {
  const { user } = await getProtectedSession();

  const address = await db.query.address.findMany({
		where: (address, { eq }) => eq(address.userId, user.id)
	})

  return address
}