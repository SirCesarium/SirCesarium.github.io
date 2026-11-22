// @ts-check
import { copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/** @type {() => import('astro').AstroIntegration} */
const sitemapAlias = () => ({
	name: 'sitemap-alias',
	hooks: {
		'astro:build:done': async ({ dir }) => {
			const indexFile = fileURLToPath(new URL('sitemap-index.xml', dir));
			const aliasFile = fileURLToPath(new URL('sitemap.xml', dir));
			if (existsSync(indexFile)) {
				copyFileSync(indexFile, aliasFile);
			}
		},
	},
});

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
		sitemapAlias(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
