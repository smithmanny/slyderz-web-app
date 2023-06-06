import * as z from "zod";

export const CreateCartType = z.object({
  // items: z.array(z.object({
  //   quantity: z.number(),
  //   dishId: z.string(),
  //   cartId: z.string()
  // })),
  address: z.object({
    address1: z.string(),
    address2: z.string().optional().nullable(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  }),
  paymentMethodId: z.string(),
  eventDate: z.date(),
  eventTime: z.string(),
});
