import * as z from "zod";

export const AddUserToMailjet = z.object({
  email: z.string().email(),
});