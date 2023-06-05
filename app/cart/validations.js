import * as z from "zod";

export const CreateCartType = z.object({
  chefId: z.string(),
  eventDate: z.string(),
  eventTime: z.string(),
});

export const AddItemToCartType = z.object({
  price: z.number(),
  quantity: z.number(),
  chefId: z.string(),
  dishId: z.string(),
  id: z.string(),
  description: z.string(),
  name: z.string(),
})

export const UpdateCartItem = z.object({
  id: z.string().uuid(),
  quantity: z.number(),
});

export const DestroyCartItem = z.object({
  cartItemId: z.string()
})