/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: "https://blog-backend-lvne.onrender.com/api/v1",
  },
};

module.exports = nextConfig;
