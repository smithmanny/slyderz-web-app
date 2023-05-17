const { withBlitz } = require("@blitzjs/next");

module.exports = withBlitz({
  reactStrictMode: true,
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/slyderz/image/upload"
  }
});