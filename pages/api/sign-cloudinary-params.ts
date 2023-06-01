import { NextApiRequest, NextApiResponse } from "next";
import getCloudinary from "app/utils/getCloudinary";

const cloudinary = getCloudinary()

const handler = async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const { body } = req;
  const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudinaryApiSecret) throw new Error("Uploading images is down right now...")
  console.log(cloudinaryApiSecret)

  const signature = cloudinary.utils.api_sign_request(body.paramsToSign, cloudinaryApiSecret);

  res.status(200).json({
    signature
  })
};

export default handler;
