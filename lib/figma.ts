/* Figma files are shared behind their own password (env CASE_PASSWORD_FIGMA),
   separate from the case study password. Every link lives encrypted in the
   asset store under this pseudo-slug and is fetched only on click. */
export const FIGMA_SLUG = 'figma';

/** The gated JSON for a named Figma link, holding `{ href }`. */
export const figmaLink = (name: string) => `/api/asset/${FIGMA_SLUG}/${name}.json`;
