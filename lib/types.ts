/** A labelled fact in the summary strip at the top of a case study. */
export interface Fact {
  label: string;
  value: string;
}

/** One picture. `src` is a path under /public; without it the slot is drawn empty.
    With `protectedSrc`, `src` is the public, unreadable preview and the real
    file is served from /api/asset once the case study password is entered. */
export interface Picture {
  src?: string;
  protectedSrc?: string;
  aspect: number;
  alt: string;
  caption?: string;
  /** Set false for a picture that should not open in the lightbox. */
  lightbox?: boolean;
  /** Link out instead of opening the lightbox: the frame becomes a link and shows `linkLabel` on hover. */
  href?: string;
  linkLabel?: string;
  /** `contain` shows the whole picture inside a frame of a different ratio; set `background` to the picture's own ground so the letterboxing disappears. */
  fit?: 'cover' | 'contain';
  background?: string;
  /** No frame: for a transparent PNG composite that should float on the page. */
  bare?: boolean;
}

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'lead'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'quote'; text: string }
  | ({ kind: 'image'; caption: string } & Picture)
  /** Two or three pictures side by side, for comparing options. */
  | { kind: 'gallery'; items: Picture[]; caption?: string }
  /** External references, such as Figma files. */
  | { kind: 'links'; items: { label: string; href: string }[] }
  /** A banner pointing to related work, e.g. the next version of a product. */
  | { kind: 'callout'; text: string; cta: string; href: string }
  /** Copy beside a picture, in two columns on wide screens. */
  | { kind: 'split'; blocks: Block[]; picture: Picture }
  /** A small figures table. `rows` are the row labels; `values` holds one
      array of cells per row, one cell per column after the first. For
      confidential figures leave `values` out and set `protectedSrc` to
      /api/asset/<slug>/<name>.json, an encrypted `{ values: [...] }`. */
  | {
      kind: 'table';
      columns: string[];
      rows: string[];
      values?: (string | number)[][];
      protectedSrc?: string;
      caption?: string;
    };

/** One entry in the sticky table of contents, and one section of the body. */
export interface Section {
  id: string;
  title: string;
  blocks: Block[];
}

export type CollectionId = 'zero-to-one' | 'agentic' | 'special';

export interface CaseStudy {
  slug: string;
  /** Which of the three collections this belongs to. */
  collection: CollectionId;
  /** Small caps row label, left of the title. */
  year: string;
  company: string;
  /** Monogram chip text in the cursor pill. Two characters reads best. */
  monogram: string;
  title: string;
  /** One line on the problem or the outcome. */
  summary: string;
  projectType: string;
  role: string;
  /** Set true to put this route behind the password gate in middleware. */
  protected: boolean;
  /** Gradient behind the screen in the gallery plate, as two CSS colours. */
  tint: [string, string];
  /** Which placeholder composition to draw. Replaced by a real screenshot later. */
  art: 'rings' | 'grid' | 'bars';
  /** Short attributes that fan out from behind the plate. Three or four reads best. */
  tags: string[];
  /** Aspect ratio of the hero image slot, as width / height. */
  heroAspect: number;
  heroCaption: string;
  heroAlt: string;
  /** The three-fact strip under the title. */
  facts: Fact[];
  /** Short-form summary shown on the home page, above the full case study. */
  brief: { label: string; body: string }[];
  /** Right rail on the case study page. */
  details: Fact[];
  sections: Section[];
}

/** Older work: a compact row of year, title and company only. */
export interface ArchiveItem {
  year: string;
  title: string;
  company: string;
  href?: string;
}
