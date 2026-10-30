const apiTarget =
  (process.env.API_INTERNAL_URL || "http://localhost:8080").replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8080", pathname: "/media/**" },
      { protocol: "https", hostname: "**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiTarget}/api/:path*`,
      },
      {
        source: "/media/:path*",
        destination: `${apiTarget}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
