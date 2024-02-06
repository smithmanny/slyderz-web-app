"use server"

import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "db";
import { getChefSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";

const createMenuSectionSchema = z.object({
  name: z.string().min(4)
})
export default async function createMenuSectionMutation(input: z.infer<typeof createMenuSectionSchema>) {
  const { chef } = await getChefSession()

  try {
    await prisma.section.create({
      data: {
        name: input.name.toLowerCase(),
        chefId: chef.id,
      },
    });

    revalidatePath("/dashboard/menu")
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new Error("Section name must be unique")
    }

    throw new UnknownError({
      message: "Section not created",
      cause: err,
    });
  }
}