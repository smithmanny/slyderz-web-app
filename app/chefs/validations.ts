import * as z from "zod"

export const MenuItem = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
})

export const DestroyMenuItem = z.object({
  menuItemId: z.string().uuid(),
})

export const CreateMenuItem = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
})

export const UpdateMenuItem = z.object({
  id: z.string().uuid(),
  quantity: z.number(),
})
