/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "bonanza-ballet.com",
      },
      {
        protocol: "https",
        hostname: "mto.yumiko.com",
      },
      {
        protocol: "https",
        hostname: "yhxujmctnnymvoynohlf.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
