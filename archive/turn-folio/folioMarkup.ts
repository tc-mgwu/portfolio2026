import type { CaseStudy } from '@/lib/types';

/* turn.js restructures the DOM it is given, so the pages are built as a single
   HTML string and injected once. React never reconciles inside the flipbook,
   which is what keeps the two from fighting over the same nodes. */

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LOCK =
  '<svg viewBox="0 0 12 14" aria-hidden="true" class="fb-lock" fill="none">' +
  '<path d="M3 6V4a3 3 0 1 1 6 0v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
  '<rect x="1.2" y="6" width="9.6" height="7.2" rx="2" fill="currentColor"/></svg>';

function plate(study: CaseStudy): string {
  return `
    <div class="fb-plate">
      <p class="fb-label">${esc(study.year)} &middot; ${esc(study.company)}</p>
      <div class="fb-slot" role="img" aria-label="${esc(study.heroAlt)}">
        <span class="fb-label">Image slot &middot; ${study.heroAspect.toFixed(2)}:1</span>
      </div>
      <p class="fb-caption">${esc(study.heroCaption)}</p>
    </div>`;
}

function text(study: CaseStudy, n: number): string {
  const lock = study.protected
    ? `${LOCK}<span class="fb-sr">, password protected</span>`
    : '';
  return `
    <div class="fb-text">
      <p class="fb-label">${esc(study.projectType)}</p>
      <h2 class="fb-title">${esc(study.title)}</h2>
      <p class="fb-summary">${esc(study.summary)}</p>
      <dl class="fb-fields">
        <div><dt class="fb-label">Role</dt><dd>${esc(study.role)}</dd></div>
        <div><dt class="fb-label">Project type</dt><dd>${esc(study.projectType)}</dd></div>
      </dl>
      <div class="fb-foot">
        <a class="fb-btn" href="/work/${esc(study.slug)}"
           data-slug="${esc(study.slug)}"
           data-protected="${study.protected ? 'true' : 'false'}"
           data-title="${esc(study.title)}">Read case study${lock}</a>
        <p class="fb-folio">${String(n).padStart(2, '0')}</p>
      </div>
    </div>`;
}

export function folioMarkup(studies: CaseStudy[]): string {
  const pages: string[] = [];

  pages.push(`<div class="hard fb-cover">
    <p class="fb-cover-name">[YOUR NAME]</p>
    <div>
      <h2 class="fb-cover-title">Selected work</h2>
      <p class="fb-cover-sub">Three projects, front to back.</p>
    </div>
    <p class="fb-cover-foot">Folio &middot; 2022&ndash;2024</p>
  </div>`);
  pages.push('<div class="hard"></div>');

  studies.forEach((study, i) => {
    pages.push(`<div>${plate(study)}</div>`);
    pages.push(`<div>${text(study, i + 1)}</div>`);
  });

  pages.push('<div class="hard"></div>');
  pages.push(`<div class="hard fb-cover fb-cover--back">
    <h2 class="fb-cover-title">Want the rest?</h2>
    <p class="fb-cover-sub">The full archive lives on the main page.</p>
  </div>`);

  return pages.join('');
}
