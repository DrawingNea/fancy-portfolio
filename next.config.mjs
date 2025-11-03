// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
