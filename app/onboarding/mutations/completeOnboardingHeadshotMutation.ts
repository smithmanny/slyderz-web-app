import { AuthorizationError, Ctx } from "blitz";
import * as z from "zod";

import db from "db";

const UploadHeadshotUrl = z.object({
  url: z.string(),
  publicId: z.string(),
});

export default async function completeOnboardingHeadshotMutation(
  input: z.infer<typeof UploadHeadshotUrl>,
  ctx: Ctx
) {
  ctx.session.$authorize("CHEF");
  const data = UploadHeadshotUrl.parse(input);
  const userId = ctx.session.userId;

  if (!userId) {
    throw new AuthorizationError("User not found");
  }

  await db.user.update({
    where: { id: userId },
    data: {
      headshotUrl: data.url,
      headhshotPublicId: data.publicId,
      chef: {
        update: {
          onboardingState: "COMPLETE_SERVSAFE",
        },
      },
    },
  });

  return true;
}
