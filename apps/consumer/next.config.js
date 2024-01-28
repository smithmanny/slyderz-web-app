/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["res.cloudinary.com", "images.unsplash.com", "lottie.host"],
		minimumCacheTTL: 60,
		loader: "cloudinary",
		path: "https://res.cloudinary.com/slyderz/image/upload",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "slyderz/image/upload",
			},
		],
	},
};
