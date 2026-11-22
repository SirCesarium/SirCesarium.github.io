export interface AboutFact {
	label: string;
	value: string;
}

export const aboutBio: string[] = [
	'I like tools that stay out of the way: fast to open and clear when something breaks. Most of what I build starts as something I needed myself.',
	'Most of my work is TypeScript and Rust. For backends I use NestJS and ExpressJS; Laravel comes in for corporate projects. On the front end it is usually Svelte, React, or Astro.',
];

export const aboutFacts: AboutFact[] = [
	{
		label: 'Status',
		value: 'Open to remote work.',
	},
	{
		label: 'Timezone',
		value: 'Venezuela (Timezone UTC-4).',
	},
	{
		label: 'Published',
		value: 'crates.io, npm, and the VS Code Marketplace.',
	},
	{
		label: 'Off-screen',
		value: 'Pixel art, color schemes, and Minecraft modding.',
	},
];
