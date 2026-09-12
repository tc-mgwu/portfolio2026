import type { CaseStudy } from '../lib/types';
import atlas from './work/atlas';

/* Add a fourth constellation by dropping a file in ./work and listing it here.
   Order is the order they appear on the home page. */
export const featured: CaseStudy[] = [atlas];

export const allWork: CaseStudy[] = [...featured];
