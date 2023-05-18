import { AuthorizationError, Ctx } from "blitz";
import getCloudinary from "app/utils/getCloudinary"
import * as z from "zod";

const cloudinary = getCloudinary()

const DestroyImageType = z.object({
  publicId: z.string(),
});

// TODO: Create destroyImageMutation
// async function destroyCloudinaryImage(publicId) {
//   return cloudinary.v2.uploader.destroy(publicId)
// }

// async function destroyDbImage(userId) {
//   return await db.user.update({
//     where: { id: userId },
//     data: {
//       headshotUrl: "",
//     },
//   });
// }

export default async function destroyCloudinaryImageMutation(
  input: z.infer<typeof DestroyImageType>,
  ctx: Ctx
) {
  const data = DestroyImageType.parse(input);
  const userId = ctx.session.userId;

  if (!userId) {
    throw new AuthorizationError("User not found");
  }

  try {
    await cloudinary.uploader.destroy(data.publicId)
  } catch (err) {
    console.log("Error deleting cloudinary image", err.message)
    throw new Error("Error deleting cloudinary image")
  }
}
