import type { ImageMetadata } from 'astro';

import inventoryApiShot from '../assets/projects/inventory-api.png';
import modcrawlShot from '../assets/projects/modcrawl.png';
import stackNavShot from '../assets/projects/stack-nav.png';
import zipcrawlShot from '../assets/projects/zipcrawl.png';
import tygShot from '../assets/projects/tyg.png';
import hellcatShot from '../assets/projects/hellcat-theme.png';

export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	slug: string;
	name: string;
	tagline: string;
	facts: string[];
	stack: string[];
	links: ProjectLink[];
	image?: ImageMetadata;
	imageFit?: 'cover' | 'contain';
	video?: string;
}

export const projects: Project[] = [
	{
		slug: 'modcrawl',
		name: 'modcrawl',
		tagline: 'Crawls Minecraft mod JARs to find crash culprits and hidden metadata.',
		facts: [
			'Reads metadata, dependencies, and embedded requirements.',
			'Finds the mod behind a crash.',
			'Classifies mods as client, server, both, or unknown.',
			'Flags duplicate classes and overlapping mixins.',
		],
		stack: ['Rust', 'TypeScript', 'CLI', 'WASM', 'Rust library', 'SvelteKit'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/SirCesarium/modcrawl' },
			{ label: 'crates.io', href: 'https://crates.io/crates/modcrawl' },
			{ label: 'npm', href: 'https://www.npmjs.com/package/modcrawl' },
		],
		image: modcrawlShot,
		imageFit: 'contain',
	},
	{
		slug: 're-color',
		name: 're-color',
		tagline:
			'A local-first SvelteKit PWA that extracts a palette from one image and repaints another.',
		facts: [
			'Runs entirely in the browser, with no server.',
			'Three built-in algorithms, plus an API for custom WASM strategies.',
			'PNG decoding runs in a Web Worker, so the canvas never blocks.',
		],
		stack: ['SvelteKit', 'Tailwind', 'PWA', 'TypeScript'],
		links: [
			{ label: 'Live demo', href: 'https://recolor.pages.dev/' },
			{ label: 'GitHub', href: 'https://github.com/SirCesarium/re-color' },
		],
		video: '/re-color-demo.mp4',
	},
	{
		slug: 'inventory-api',
		name: 'inventory-api',
		tagline: 'Inventory REST API with role-based access control.',
		facts: [
			'Token auth with rate-limited login.',
			'Role-permission matrix and an audit trail on every change.',
			'Append-only stock movements, 100% auditable; current stock comes from the latest movement.',
		],
		stack: ['Laravel', 'PHP', 'Pest', 'Docker', 'PostgreSQL'],
		links: [
			{ label: 'Live demo', href: 'https://inventory-api-y8ou.onrender.com' },
			{ label: 'GitHub', href: 'https://github.com/SirCesarium/inventory-api' },
		],
		image: inventoryApiShot,
	},
	{
		slug: 'stack-nav',
		name: 'stack-nav',
		tagline: 'State-based navigation for React apps without URLs.',
		facts: ['Zero dependencies.', '1.2 kB gzipped.', 'Made for Tauri and Electron shells.'],
		stack: ['React', 'TypeScript', 'TypeScript library'],
		links: [
			{ label: 'npm', href: 'https://www.npmjs.com/package/stack-nav' },
			{ label: 'GitHub', href: 'https://github.com/SirCesarium/stack-nav' },
		],
		image: stackNavShot,
	},
	{
		slug: 'zipcrawl',
		name: 'zipcrawl',
		tagline: 'An ergonomic CLI and Rust library for exploring ZIP archives safely.',
		facts: ['Zip-bomb and path-traversal guards on every entry read.'],
		stack: ['Rust', 'CLI', 'Rust library'],
		links: [
			{ label: 'crates.io', href: 'https://crates.io/crates/zipcrawl' },
			{ label: 'GitHub', href: 'https://github.com/SirCesarium/zipcrawl' },
		],
		image: zipcrawlShot,
	},
	{
		slug: 'tyg',
		name: 'Type-Generator',
		tagline:
			'An ergonomic CLI wrapper around json_typegen: typed code from JSON, YAML, TOML, XML, and properties.',
		facts: ['Adds YAML, TOML, XML, and properties parsing on top of json_typegen.'],
		stack: ['Rust', 'CLI', 'json_typegen'],
		links: [
			{ label: 'crates.io', href: 'https://crates.io/crates/tyg' },
			{ label: 'GitHub', href: 'https://github.com/SirCesarium/tyg' },
		],
		image: tygShot,
	},
	{
		slug: 'hellcat-theme',
		name: 'hellcat-theme',
		tagline: 'A charred, gruvbox-inspired VS Code theme in three variants.',
		facts: ['Neutral, Crimson, and Oxide, with contrast tuned across all three.'],
		stack: ['VS Code', 'Theme'],
		links: [
			{
				label: 'Marketplace',
				href: 'https://marketplace.visualstudio.com/items?itemName=SirCesarium.hellcat-theme',
			},
			{ label: 'GitHub', href: 'https://github.com/SirCesarium/hellcat-theme' },
		],
		image: hellcatShot,
	},
];
