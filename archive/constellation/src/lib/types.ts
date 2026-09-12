/** A star in a constellation. Coordinates are in the 0-100 unit space of the
    constellation's own viewBox, so shapes stay resolution independent. */
export interface Star {
  x: number;
  y: number;
  /** 0.6 to 1.4. Drives radius and brightness. */
  mag: number;
  /** One word revealed on hover or focus: a skill or artifact from the project. */
  label: string;
}

/** Indices into `stars`, drawn in order so the shape traces point to point. */
export type Edge = [number, number];

export interface CaseStudy {
  slug: string;
  title: string;
  /** One line of problem framing. */
  problem: string;
  /** One line of outcome, including a metric. */
  outcome: string;
  tags: string[];
  /** Short label for the work index. */
  subtitle: string;
  constellation: {
    /** A name for the shape, used in the aria label. */
    shape: string;
    stars: Star[];
    edges: Edge[];
  };
}
