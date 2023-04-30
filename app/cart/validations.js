import * as z from "zod";

export const CreateOrder = z.object({
  eventDate: z.date(),
  eventTime: z.string()
});
