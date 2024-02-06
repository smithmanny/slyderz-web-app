/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["assets.slyderz.co", "images.unsplash.com", "lottie.host"],
		minimumCacheTTL: 60,
	},
};
