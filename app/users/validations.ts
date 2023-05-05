import * as z from "zod";

export const AddUserAddress = z.object({
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  state: z.string().default('GA'),
  zipcode: z.string()
})
