import { revalidatePath } from 'next/cache'

import { auth } from "app/lib/auth";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { validFormData } from "app/lib/utils";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const { email, password } = validFormData<{ email: string, password: string }>(formData)

  try {
      const key = await auth.useKey("email", email.toLowerCase(), password);
      const user = await auth.getUser(key.userId)
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {
          stripeCustomerId: user.stripeCustomerId,
          email: user.email,
          emailVerified: user.emailVerified,
          name: user.name,
          role: user.role
        },
      });

      const authRequest = auth.handleRequest(request.method, context);
      authRequest.setSession(session);

      revalidatePath('/')
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/"
        }
      });
    } catch (err) {
      return NextResponse.json(
        {
          error: "Invalid email/password. No account found."
        },
        {
          status: 400
        }
      );
    }
};