import prisma from "db";
import { getStripeServer } from "app/lib/stripe";
import { getProtectedSession } from "app/lib/auth";
import { NotFoundError } from "app/lib/errors";

export async function POST() {
  const session = await getProtectedSession()
  const stripe = getStripeServer();

  const user = await prisma.authUser.findFirstOrThrow({
    where: { id: session.user.userId },
    select: {
      id: true,
      email: true,
      chef: {
        select: {
          stripeAccountId: true,
        },
      },
    },
  });

  if (!user.chef) {
    throw new NotFoundError({
      message: "Chef not found"
    });
  }

  const createAccountLink = await stripe.accountLinks.create({
    account: user.chef.stripeAccountId,
    refresh_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe/reauth`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    type: "account_onboarding",
  });

  return Response.json({
    url: createAccountLink.url
  })
}