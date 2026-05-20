/**
 * Prepends the basePath to static asset URLs so they resolve correctly
 * on both local dev (no prefix) and GitHub Pages sub-path deployments.
 */
export const assetPath = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
