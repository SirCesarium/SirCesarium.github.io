import { config, fields, collection } from '@keystatic/core';

export default config({
	storage: {
		kind: 'local',
	},
	collections: {
		blog: collection({
			label: 'Blog Posts',
			slugField: 'title',
			path: 'src/content/blog/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				description: fields.text({ label: 'Description', multiline: true }),
				pubDate: fields.date({
					label: 'Published date',
					defaultValue: { kind: 'today' },
				}),
				updatedDate: fields.date({
					label: 'Updated date (optional)',
				}),
				draft: fields.checkbox({
					label: 'Draft',
					defaultValue: false,
				}),
				tags: fields.array(fields.text({ label: 'Tag' }), {
					label: 'Tags',
					itemLabel: (props) => props.value,
				}),
				coverImage: fields.text({
					label: 'Cover image URL or path (optional)',
				}),
				content: fields.markdoc({
					label: 'Content',
				}),
			},
		}),
	},
});
