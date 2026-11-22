import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { site } from '../data/site';

export const GET: APIRoute = async (context) => {
	const siteUrl = context.site ?? site.url;

	return rss({
		title: `${site.name} — Software Projects`,
		description: site.description,
		site: siteUrl,
		items: projects.map((project) => {
			const projectUrl =
				project.links.find((l) => l.label === 'Live demo')?.href ??
				project.links.find((l) => l.label === 'GitHub')?.href ??
				`${site.url}/#project-${project.slug}`;

			return {
				title: project.name,
				description: `${project.tagline} Technologies: ${project.stack.join(', ')}.`,
				link: projectUrl,
				pubDate: new Date('2026-01-01'),
				categories: project.stack,
			};
		}),
		customData: `<language>en-us</language>`,
	});
};
