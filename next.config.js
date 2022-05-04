/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: { images: { layoutRaw: true } }
};

module.exports = nextConfig;
