/* Keyboard, mouse and touch. Reports intent only. */

export interface Handlers {
  onActivate(): void;
  onEscape(): void;
  onSpace(): void;
  onWalkTo(worldX: number, worldY: number): void;
  onWalkToMonument(id: string): void;
  onRotate(): void;
  onStep(delta: -1 | 1): void;
  onFirstInput(): void;
}

const RIGHT = new Set(['ArrowRight', 'd', 'D']);
const LEFT = new Set(['ArrowLeft', 'a', 'A']);
const ENTER = new Set(['Enter', 'ArrowUp']);

export class Input {
  dir: -1 | 0 | 1 = 0;

  private held = new Set<string>();
  private touched = false;

  constructor(
    private viewport: HTMLElement,
    private h: Handlers,
    private reduced: () => boolean,
    private camera: () => { x: number; y: number },
  ) {
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
    window.addEventListener('blur', () => { this.held.clear(); this.dir = 0; });
    this.viewport.addEventListener('click', this.click);
  }

  private first(): void {
    if (this.touched) return;
    this.touched = true;
    this.h.onFirstInput();
  }

  private keydown = (e: KeyboardEvent): void => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === 'Escape') { this.h.onEscape(); return; }

    if (e.key === ' ' || e.key === 'Spacebar') {
      const focused = document.activeElement;
      if (focused && focused !== document.body && focused.closest('a,button')) return;
      this.first();
      this.h.onSpace();
      e.preventDefault();
      return;
    }

    if (ENTER.has(e.key)) {
      const focused = document.activeElement;
      if (focused && focused !== document.body && focused.closest('a,button')) return;
      this.first();
      this.h.onActivate();
      e.preventDefault();
      return;
    }

    const right = RIGHT.has(e.key);
    const left = LEFT.has(e.key);
    if (!right && !left) return;

    this.first();
    e.preventDefault();

    if (this.reduced()) {
      if (!this.held.has(e.key)) this.h.onStep(right ? 1 : -1);
      this.held.add(e.key);
      return;
    }
    this.held.add(e.key);
    this.dir = right ? 1 : -1;
  };

  private keyup = (e: KeyboardEvent): void => {
    if (!this.held.delete(e.key)) return;
    if (this.reduced()) return;
    const r = [...this.held].some((k) => RIGHT.has(k));
    const l = [...this.held].some((k) => LEFT.has(k));
    this.dir = r ? 1 : l ? -1 : 0;
  };

  private click = (e: MouseEvent): void => {
    const t = e.target as HTMLElement;

    if (t.closest('.platform')) { this.first(); this.h.onRotate(); e.preventDefault(); return; }

    const monument = t.closest<HTMLElement>('.monument');
    if (monument) {
      const id = monument.dataset.id;
      if (id) { e.preventDefault(); this.first(); this.h.onWalkToMonument(id); return; }
    }

    if (t.closest('.corner') || t.closest('.sr-list') || t.closest('a')) return;

    this.first();
    const rect = this.viewport.getBoundingClientRect();
    const cam = this.camera();
    this.h.onWalkTo(e.clientX - rect.left + cam.x, e.clientY - rect.top + cam.y);
  };
}
