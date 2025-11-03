const isProd = process.env.NODE_ENV === 'production';
const repoName = '/fancy-portfolio';

export const basePath = isProd ? repoName : '';
