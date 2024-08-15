/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
module.exports = {
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};
