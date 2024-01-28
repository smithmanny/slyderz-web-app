import getCloudinary from "app/lib/cloudinary";

export async function POST(request: Request) {
	const body = await request.json();
	const cloudinary = getCloudinary();
	const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

	if (!cloudinaryApiSecret)
		throw new Error("Uploading images is down right now...");

	const signature = cloudinary.utils.api_sign_request(
		body.paramsToSign,
		cloudinaryApiSecret,
	);

	return Response.json({ signature });
}
