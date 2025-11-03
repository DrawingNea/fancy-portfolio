/** @type {import('next').NextConfig} */
const repoName = '/fancy-portfolio'; // replace with your GitHub repo name

const nextConfig = {
  basePath: repoName,
  assetPrefix: repoName,
  reactStrictMode: true,
};

export default nextConfig;
