import * as z from "zod";

export const CreateSection = z.object({
	name: z.string(),
});
export const DeleteSection = z.object({
	sectionId: z.string(),
});
export const DestroyHour = z.object({
	hourId: z.string(),
});

export const GetChefSectionDish = z.object({
	dishId: z.string(),
	sectionId: z.string(),
});

export const GetChefSectionDishes = z.object({
	sectionId: z.string(),
});

export const CreateDish = z.object({
	sectionId: z.string(),
	description: z.string(),
	name: z.string(),
	price: z.string(),
	image: z.object({
		imageUrl: z.string(),
		imagePublicId: z.string(),
	}),
});

export const UpdateDish = z.object({
	selectedDishId: z.string(),
	description: z.string(),
	name: z.string(),
	price: z.string(),
	image: z.object({
		imageUrl: z.string(),
		imagePublicId: z.string(),
	}),
});

export const DestroyDish = z.object({
	dishId: z.string(),
});

export const DestroyDishImageType = z.object({
	publicId: z.string(),
});

export const CreateHours = z.object({
	daysOfWeek: z.array(
		z.enum([
			"SUNDAY",
			"MONDAY",
			"TUESDAY",
			"WEDNESDAY",
			"THURSDAY",
			"FRIDAY",
			"SATURDAY",
		]),
	),
	endTime: z.string(),
	startTime: z.string(),
});
