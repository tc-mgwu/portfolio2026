import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Multi-page build. Every route is a real HTML entry, so case study pages are
// deep-linkable and ship only their own JS. The landing scene stays self-contained.
const page = (p: string) => resolve(__dirname, p);

export default defineConfig({
  appType: 'mpa',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        scene: page('index.html'),
        about: page('about/index.html'),
        thesis: page('work/thesis/index.html'),
        archives: page('work/archives/index.html'),
        health: page('work/health-tech/index.html'),
        telecom: page('work/telecom/index.html'),
        legal: page('work/legal/index.html'),
        sense: page('work/sense/index.html'),
        arinsights: page('work/arinsights/index.html'),
      },
    },
  },
});
