module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    minimumCacheTTL: 60,
    loader: "cloudinary",
    path: "https://res.cloudinary.com/slyderz/image/upload",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: 'slyderz/image/upload',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
      },
      {
        source: '/signup',
        destination: '/auth/signup',
      },
    ]
  },
};