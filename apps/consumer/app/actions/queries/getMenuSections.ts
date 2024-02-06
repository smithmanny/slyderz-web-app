"use server"

import prisma from "db"
import { getChefSession } from "app/lib/auth"

export default async function getMenuSectionsQuery() {
  const { chef } = await getChefSession()

  return await prisma.section.findMany({
    where: {
      chefId: chef.id
    }
  })
}