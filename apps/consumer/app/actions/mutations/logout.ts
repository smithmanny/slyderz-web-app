"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { auth, getSession } from "app/lib/auth";

export default async function logoutMutation() {
	const { session } = await getSession()

	if (!session) {
		return new Response(null, {
			status: 401,
		});
	}
	// make sure to invalidate the current session!
	await auth.invalidateSession(session.id);
	const sessionCookie = auth.createBlankSessionCookie()
	// delete session cookie
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	revalidatePath("/");
	redirect("/");
}
