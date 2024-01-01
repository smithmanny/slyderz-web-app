'use server'

import prisma from "db";

export async function getPrisma() {
  return prisma
}