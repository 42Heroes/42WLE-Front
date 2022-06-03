/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["cdn.intra.42.fr", "localhost", "*"],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: { images: { layoutRaw: true } },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
