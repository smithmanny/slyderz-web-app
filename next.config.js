module.exports = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    loader: "cloudinary",
    path: "https://res.cloudinary.com/slyderz/image/upload",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: 'slyderz/image/upload',
      },
    ],
  }
};