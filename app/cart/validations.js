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