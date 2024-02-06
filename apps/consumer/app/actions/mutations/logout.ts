"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "app/lib/auth";
import * as context from "next/headers";

export default async function logoutMutation() {
	const authRequest = auth.handleRequest("POST", context);
	// check if user is authenticated
	const session = await authRequest.validate();

	if (!session) {
		return new Response(null, {
			status: 401,
		});
	}
	// make sure to invalidate the current session!
	await auth.invalidateSession(session.sessionId);
	// delete session cookie
	authRequest.setSession(null);

	revalidatePath("/");
	redirect("/");
}
