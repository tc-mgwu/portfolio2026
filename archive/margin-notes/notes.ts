import type { Note } from '@/components/MarginNotes';

/* The annotation pass, in Toni's own voice. Every note points at something
   already on the page; none of them carry information of their own. Edit the
   copy here, the same way case study text lives in content files. */
export const homeNotes: Note[] = [
  {
    id: 'statement',
    target: 'note-statement',
    kind: 'circle',
    text: '[the part I actually mean]',
    side: 'right',
  },
  {
    id: 'current',
    target: 'note-current',
    kind: 'underline',
    text: '[and open to what’s next]',
  },
  {
    id: 'role',
    target: 'note-role',
    kind: 'arrow',
    text: '[end to end, not just the pretty part]',
    side: 'right',
  },
];
