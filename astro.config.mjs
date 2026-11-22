// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://sircesarium.github.io',
	integrations: [
		sitemap({
			serialize(item) {
				item.lastmod = new Date();
				item.changefreq = 'monthly';
				item.priority = 1.0;
				return item;
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
