"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"

import prisma from "db"

const deleteMenuSectionSchema = z.object({
  sectionId: z.string()
})
export async function deleteMenuSectionMutation(input: z.infer<typeof deleteMenuSectionSchema>) {
  const dishesOnSection = await prisma.dish.findMany({
    where: {
      sectionId: input.sectionId
    }
  })

  if (dishesOnSection.length > 0) {
    return {
      message: "Delete dishes on section first",
      error: true
    }
  }

  try {
    await prisma.section.update({
      where: {
        id: input.sectionId
      },
      data: {
        isActive: false
      }
    })
  } catch (err) {
    return {
      message: "Failed to delete section",
      error: true
    }
  }

  revalidatePath("/dashboard/menu")

  return {
    message: "Section successfully deleted",
    error: false
  }
}