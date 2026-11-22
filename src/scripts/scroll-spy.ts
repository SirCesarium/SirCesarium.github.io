export const initScrollSpy = (): void => {
	const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));

	const sectionEntries = links
		.map((link) => {
			const href = link.getAttribute('href');
			if (!href) return null;
			const hashIndex = href.indexOf('#');
			if (hashIndex === -1) return null;
			const targetId = href.slice(hashIndex + 1);
			const el = targetId ? document.getElementById(targetId) : null;
			return el ? { el, link } : null;
		})
		.filter((entry): entry is { el: HTMLElement; link: HTMLAnchorElement } => entry !== null);

	const setActive = () => {
		const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
		const isHomePage = currentPath === '/';

		if (!isHomePage) {
			for (const link of links) {
				const href = link.getAttribute('href')?.replace(/\/$/, '') || '';
				const isActive =
					href === currentPath || (href === '/blog' && currentPath.startsWith('/blog'));
				link.classList.toggle('is-active', isActive);
				if (isActive) link.setAttribute('aria-current', 'page');
				else link.removeAttribute('aria-current');
			}
			return;
		}

		const y = window.scrollY + 80;
		let active: HTMLElement | null = null;

		for (const { el } of sectionEntries) {
			if (el.offsetTop <= y) active = el;
		}

		if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
			active = sectionEntries[sectionEntries.length - 1]?.el ?? null;
		}

		for (const link of links) {
			const href = link.getAttribute('href') ?? '';
			const hashIndex = href.indexOf('#');
			const targetId = hashIndex !== -1 ? href.slice(hashIndex + 1) : '';
			const isActive = active !== null && targetId === active.id;

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

if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initScrollSpy);
	} else {
		initScrollSpy();
	}
}
