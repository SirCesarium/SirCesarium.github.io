import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { projects } from '../data/projects';
import { site } from '../data/site';

export const GET: APIRoute = async (context) => {
	const siteUrl = (context.site ?? site.url).toString().replace(/\/$/, '');
	const blogPosts = await getCollection('blog');

	const projectItems = projects.map((project) => {
		const projectUrl =
			project.links.find((l) => l.label === 'Live demo')?.href ??
			project.links.find((l) => l.label === 'GitHub')?.href ??
			`${siteUrl}/#project-${project.slug}`;

		return {
			title: project.name,
			description: `${project.tagline} Technologies: ${project.stack.join(', ')}.`,
			link: projectUrl,
			pubDate: new Date('2026-01-01'),
			categories: project.stack,
		};
	});

	const blogItems = blogPosts
		.filter((post) => !post.data.draft)
		.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			link: `${siteUrl}/blog/${post.id}/`,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
		}));

	const allItems = [...blogItems, ...projectItems].sort(
		(a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
	);

	return rss({
		title: `${site.name} — Blog & Projects`,
		description: site.description,
		site: siteUrl,
		items: allItems,
		customData: `<language>en-us</language>`,
	});
};
