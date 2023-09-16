import * as z from "zod";

export const AddUserToMailjet = z.object({
  email: z.string().email(),
});

export const ConvertUserToChefManually = z.object({
  userId: z.string()
})