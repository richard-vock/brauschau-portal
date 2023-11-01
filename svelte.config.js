import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        csrf: {
            checkOrigin: process.env.NODE_ENV === 'production',
        },
    },
    preprocess: vitePreprocess(),
}

export default config
