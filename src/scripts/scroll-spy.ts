export const initScrollSpy = (): void => {
	const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));

	const sections = links
		.map((link) => {
			const hash = link.getAttribute('href');
			return hash ? document.querySelector<HTMLElement>(hash) : null;
		})
		.filter((section): section is HTMLElement => section !== null);

	const setActive = () => {
		const y = window.scrollY + 80;
		let active: HTMLElement | null = null;

		for (const section of sections) {
			if (section.offsetTop <= y) active = section;
		}

		if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
			active = sections[sections.length - 1] ?? null;
		}

		for (const link of links) {
			const isActive = active !== null && link.getAttribute('href') === `#${active.id}`;

			link.classList.toggle('is-active', isActive);

			if (isActive) link.setAttribute('aria-current', 'location');
			else link.removeAttribute('aria-current');
		}
	};

	let ticking = false;

	const onScroll = () => {
		if (ticking) return;

		ticking = true;

		requestAnimationFrame(() => {
			setActive();
			ticking = false;
		});
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);

	setActive();
};

initScrollSpy();
