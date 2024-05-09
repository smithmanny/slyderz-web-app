"use server";

import { eq } from "drizzle-orm";

import { getProtectedSession } from "app/lib/auth";
import { UnknownError } from "app/lib/errors";
import { uploadS3Image } from "app/lib/utils";
import { db } from "drizzle";
import { users } from "drizzle/schema/user";

export default async function uploadProfilePhotoMutation(input: FormData) {
	const { user } = await getProtectedSession();
	const file = input.get("file") as unknown as File;

	if (!file) {
		throw new Error("No file uploaded");
	}

	try {
		const url = await uploadS3Image({
			userId: user.id,
			file,
		});

		await db
			.update(users)
			.set({
				headshotUrl: url,
			})
			.where(eq(users.id, user.id));

		return url;
	} catch (err: any) {
		throw new UnknownError({
			message: "Unknow error uploading image",
			cause: err,
		});
	}
}
