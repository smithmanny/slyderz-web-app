import * as z from "zod";

export const MenuItem = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const CreateMenuItem = z.object({
  chefId: z.number(),
  id: z.string().uuid(),
  description: z.string(),
  name: z.string(),
  price: z.number(),
  dishId: z.number(),
  quantity: z.number(),
});

export const GetChefDishesType = z.string();