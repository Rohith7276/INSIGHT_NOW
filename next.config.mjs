/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static.vecteezy.com', "th.bing.com"], // Replace with your image domain
  },
    reactStrictMode: true,
    env: {
        NEWS_API_KEY: process.env.NEWS_API_KEY,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
    }
  }
export default nextConfig;
