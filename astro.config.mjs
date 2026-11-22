// @ts-check
import { copyFileSync, existsSync } from 'node:fs';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

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

const isDev = process.argv.includes('dev') || process.env.npm_lifecycle_event === 'dev';

// https://astro.build/config
export default defineConfig({
	site: 'https://sircesarium.github.io',
	integrations: [
		react(),
		markdoc(),
		...(isDev ? [keystatic()] : []),
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
