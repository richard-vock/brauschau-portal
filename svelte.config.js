import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  kit: {
    adapter: adapter({ runtime: 'nodejs22.x' }),
    csrf: { checkOrigin: process.env.NODE_ENV === 'production' }
  },
  preprocess: vitePreprocess()
};
export default config;
