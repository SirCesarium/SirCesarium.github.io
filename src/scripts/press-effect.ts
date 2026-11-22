export const initPressEffect = (): void => {
	const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const press = (node: HTMLElement) => {
		if (reducedMotion()) return;

		node.animate(
			[
				{ translate: '0 0', scale: '0.98' },
				{ translate: '-1px -1px', scale: '1.02', offset: 0.4 },
				{ translate: '0 0', scale: '1' },
			],
			{ duration: 420, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
		);
	};

	document.querySelectorAll<HTMLAnchorElement>('[data-press]').forEach((node) => {
		node.addEventListener('click', () => press(node));
	});
};

initPressEffect();
