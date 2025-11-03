// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const repoName = '/fancy-portfolio';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
