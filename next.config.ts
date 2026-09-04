import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);
let repoName = '';
if (process.env.GITHUB_REPOSITORY) {
  repoName = process.env.GITHUB_REPOSITORY.split('/')[1] || '';
}

// Support explicit NEXT_PUBLIC_BASE_PATH, fallback to GitHub Actions repo subpath if not custom domain
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (isGithubActions && repoName && !process.env.CUSTOM_DOMAIN ? `/${repoName}` : '');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath ? basePath : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
