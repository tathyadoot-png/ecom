import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
  // babel-plugin-react-compiler was already installed but never
  // switched on — this is the single flag that activates it (a
  // top-level option as of Next 16, not under `experimental`).
  // Automatic memoization across the app is preferred here over
  // hand-placed React.memo/useCallback, which the RULES for this
  // phase explicitly caution against overusing.
  reactCompiler: true,
};

export default nextConfig;
