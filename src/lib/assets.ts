/**
 * Helper to resolve static asset paths taking into account Next.js basePath
 * for GitHub Pages subpath deployments (e.g. /bluehorse/).
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  // Remote URLs or data/blob URLs are returned as-is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${basePath}${cleanPath}`;
}
