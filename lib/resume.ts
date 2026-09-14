/* The resume is a gated download: encrypted under private/work/resume and
   served by the asset route once the shared case study password is entered.
   The PDF carries that password itself, so it is never linked in the clear. */
export const RESUME_SLUG = 'resume';
export const RESUME_FILE = 'Toni-Chen-Resume-2026.pdf';
export const RESUME_PATH = `/api/asset/${RESUME_SLUG}/${RESUME_FILE}`;
