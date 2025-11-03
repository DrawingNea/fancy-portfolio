// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? basePath : '',
  assetPrefix: isProd ? basePath : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
