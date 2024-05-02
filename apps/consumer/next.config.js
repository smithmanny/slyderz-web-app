/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["assets.slyderz.co", "images.unsplash.com", "lottie.host"],
		minimumCacheTTL: 60,
	},
	webpack: (config) => {
		config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");

		config.module.rules.push({
			test: /\.m?js$/,
			type: "javascript/auto",
			resolve: {
				fullySpecified: false,
			},
		});
		return config;
	},
};
