import * as z from "zod";

export const CreateCartType = z.object({
  items: z.array(z.object({
    quantity: z.number(),
    dishId: z.string(),
    cartId: z.string()
  })),
  chefId: z.string(),
  total: z.number(),
  eventDate: z.date(),
  eventTime: z.string(),
});

export const AddMenuItemToCartType = z.object({
  price: z.number(),
  quantity: z.number(),
  chefId: z.string(),
  dishId: z.string()
})

export const UpdateMenuItem = z.object({
  id: z.string().uuid(),
  quantity: z.number(),
});

export const DestroyMenuItem = z.string().uuid()