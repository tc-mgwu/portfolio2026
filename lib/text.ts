/* Title case for navigation labels. Section headings in the content files are
   written in sentence case; the contents rail shows them as titles.

   Small words stay lower case unless they open the title or follow a colon.
   Words that already carry capitals (Reva, PM, PowerBI) are left
   as written, and each part of a hyphenated word is capitalised. */

const SMALL = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'so', 'yet',
  'as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via', 'vs',
  'with', 'from', 'into', 'onto', 'over', 'per',
]);

function cap(word: string): string {
  if (/[A-Z]/.test(word)) return word;
  return word
    .split('-')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join('-');
}

export function titleCase(s: string): string {
  const words = s.split(' ');
  return words
    .map((w, i) => {
      const startsClause = i === 0 || /[:.?!]$/.test(words[i - 1]);
      const bare = w.replace(/[^\p{L}\p{N}’'-]/gu, '').toLowerCase();
      if (!startsClause && SMALL.has(bare)) return w;
      return cap(w);
    })
    .join(' ');
}
