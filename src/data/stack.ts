export interface StackGroup {
	label: string;
	items: string[];
}

export interface StackFact {
	label: string;
	value: string;
}

export const stackGroups: StackGroup[] = [
	{
		label: 'Primary',
		items: ['TypeScript', 'Rust', 'Node.js', 'Docker', 'GitHub Actions'],
	},
	{
		label: 'Regular',
		items: ['Svelte', 'React', 'Astro', 'Laravel', 'NestJS', 'ExpressJS'],
	},
	{
		label: 'Occasional',
		items: ['Go', 'Python', 'Kotlin', 'C#', 'Java'],
	},
];

export const workFacts: StackFact[] = [
	{
		label: 'Languages',
		value: 'English C1 certified. Spanish native.',
	},
	{
		label: 'Environment',
		value: 'Linux on my main machine.',
	},
	{
		label: 'Open source',
		value: 'Merged a feature into a Minecraft mod with 12M+ downloads.',
	},
	{
		label: 'Code review',
		value:
			'Maintained repositories, reviewed and submitted PRs, fixed edge cases, and added tests before merging.',
	},
];
