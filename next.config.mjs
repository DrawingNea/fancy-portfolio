const repoName = '/fancy-portfolio';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? repoName : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
