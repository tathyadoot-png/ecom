/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Allows all paths under this hostname
      },
      // Add other hostnames here if needed (e.g., 'images.unsplash.com')
    ],
  },
};

module.exports = nextConfig;