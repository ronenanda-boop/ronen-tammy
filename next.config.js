/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["he", "en"],
    defaultLocale: "he"
  },
  experimental: {
    typedRoutes: true
  }
};

module.exports = nextConfig;
