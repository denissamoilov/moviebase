/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Disable prerendering for API routes to prevent build-time errors
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Ensure API routes are not statically generated
  trailingSlash: false,
};

export default nextConfig;
