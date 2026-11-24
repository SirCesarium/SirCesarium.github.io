import { defineMarkdocConfig } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
	tags: {
		video: {
			render: 'video',
			attributes: {
				src: { type: String, required: true },
				poster: { type: String },
				controls: { type: Boolean, default: true },
				playsinline: { type: Boolean, default: true },
				preload: { type: String, default: 'metadata' },
			},
		},
	},
});
