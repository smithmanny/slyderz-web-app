import * as z from "zod";

export const AddChefDescription = z.object({
	description: z.string().max(60),
});

export const UploadHeadshotUrl = z.object({
	image: z.string(),
	imagePublicId: z.string(),
});
