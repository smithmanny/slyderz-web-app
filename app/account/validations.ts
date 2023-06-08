import * as z from "zod";

export const DeleteStripePaymentMethod = z.object({
  paymentMethodId: z.string(),
});

export const CreateImageType = z.object({
  publicId: z.string(),
  image: z.string(),
});

export const DestroyImageType = z.object({
  publicId: z.string(),
});

export const AddUserAddressType = z.object({
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  state: z.string().default("GA"),
  zipcode: z.string(),
});
