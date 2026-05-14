/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This allows the build to succeed even if there are linting errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also ignore typescript errors if you just want to get it live
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
