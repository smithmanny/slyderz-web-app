import { cookies } from "next/headers";

import { auth } from "app/lib/auth";

export async function POST(request: Request) {
  const body = await request.json()
  const sessionId = body.sessionId
	const sessionCookie = auth.createSessionCookie(sessionId);
	cookies().set(sessionCookie);

  return Response.json({
    message: "Successfully verified email"
  })
}