export const initProjectVideos = (): void => {
	const projectVideos = document.querySelectorAll<HTMLVideoElement>('video[data-project-video]');

	if (projectVideos.length > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const video = entry.target as HTMLVideoElement;

					if (entry.isIntersecting) {
						void video.play().catch(() => {});
					} else {
						video.pause();
					}
				}
			},
			{ rootMargin: '200px' },
		);

		projectVideos.forEach((video) => observer.observe(video));
	}
};

initProjectVideos();
