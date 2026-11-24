export const initScrollReveal = (): void => {
	const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

	if (!('IntersectionObserver' in window) || reveals.length === 0) {
		document.documentElement.classList.remove('reveal-enabled');
		return;
	}

	const revealObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;

				entry.target.classList.add('is-revealed');
				revealObserver.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -2% 0px', threshold: 0.05 },
	);

	for (const node of reveals) {
		revealObserver.observe(node);
	}
};

if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initScrollReveal);
	} else {
		initScrollReveal();
	}
}
