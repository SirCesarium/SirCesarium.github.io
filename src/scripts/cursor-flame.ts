export const initCursorFlame = (): void => {
	const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const fire = [
		'#ffcf5c',
		'#ffcf5c',
		'#ffab3d',
		'#ffab3d',
		'#ff7a2f',
		'#ff7a2f',
		'#ff4d21',
		'#ff2a16',
		'#fff6e8',
	];

	const fog = document.querySelector<HTMLElement>('.cursor-fog');
	const puff = document.querySelector<HTMLElement>('.cursor-fog-puff');
	const heat = document.querySelector<HTMLElement>('.cursor-heat');
	const dim = document.querySelector<HTMLElement>('.page-dim');
	const deadPixel = document.querySelector<HTMLElement>('.dead-pixel-line');
	const deadPixelMsg = document.querySelector<HTMLElement>('.dead-pixel-msg');

	const place = (px: number, py: number) => {
		if (fog) fog.style.translate = `${px}px ${py}px`;
		if (heat) heat.style.translate = `${px}px ${py}px`;
	};

	const reveal = (on: boolean) => {
		fog?.classList.toggle('is-on', on);
		heat?.classList.toggle('is-on', on);
	};

	const ember = (x: number, y: number, size: number, color: string) => {
		const particle = document.createElement('span');

		particle.setAttribute('aria-hidden', 'true');
		particle.style.cssText = `position:fixed;box-sizing:border-box;left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;background:radial-gradient(circle at 50% 70%, #fff8f2 0%, ${color} 78%);box-shadow:0 0 4px color-mix(in srgb, ${color} 65%, transparent), 0 0 12px color-mix(in srgb, ${color} 45%, transparent);pointer-events:none;z-index:50`;

		document.body.appendChild(particle);

		return particle;
	};

	const spark = (x: number, y: number, count: number, power = 1) => {
		for (let index = 0; index < count; index += 1) {
			const size = 5 + Math.floor(Math.random() * 4);
			const jitter = (Math.random() - 0.5) * 10;
			const color = fire[Math.floor(Math.random() * fire.length)];
			const particle = ember(x + jitter, y, size, color);

			const sway = tense ? 14 + Math.random() * 14 : 6 + Math.random() * 12;
			const phase = Math.random() * Math.PI * 2;
			const rise = (40 + Math.random() * 55) * power * (tense ? 1.15 : 1);

			const frames = [0, 0.22, 0.45, 0.7, 1].map((t, step) => ({
				translate: `${(Math.sin(phase + step * 2.3) * sway * t).toFixed(1)}px ${(-rise * t).toFixed(1)}px`,
				scale: `${(1 - t * 0.8).toFixed(2)}`,
				opacity: step === 0 || step === 4 ? 0 : 1,
				offset: t,
			}));

			const animation = particle.animate(frames, {
				duration: (520 + Math.random() * 320) * (power > 1 ? 1.8 : 1) * (tense ? 1.25 : 1),
				delay: index * 14 + Math.random() * 40,
				easing: 'linear',
				fill: 'backwards',
			});

			animation.finished.then(() => particle.remove()).catch(() => particle.remove());
		}
	};

	const blast = (x: number, y: number) => {
		const flash = document.createElement('span');

		flash.setAttribute('aria-hidden', 'true');
		flash.style.cssText = `position:fixed;left:${x - 80}px;top:${y - 80}px;width:160px;height:160px;border-radius:9999px;background:radial-gradient(circle at 50% 55%, #fff9f0 0%, #ffcf5c 28%, #ff7a2f 52%, transparent 70%);filter:blur(6px);pointer-events:none;z-index:49`;

		document.body.appendChild(flash);

		const flashAnimation = flash.animate(
			[
				{ scale: '0.2', opacity: 0.95 },
				{ scale: '1.1', opacity: 0.85, offset: 0.4 },
				{ scale: '1.9', opacity: 0 },
			],
			{ duration: 640, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
		);

		flashAnimation.finished.then(() => flash.remove()).catch(() => flash.remove());

		for (let index = 0; index < 48; index += 1) {
			const size = 4 + Math.floor(Math.random() * 6);
			const color = fire[Math.floor(Math.random() * fire.length)];
			const particle = ember(x, y, size, color);

			const angle = Math.PI + Math.random() * Math.PI;
			const distance = 50 + Math.random() * 130;
			const dx = Math.cos(angle) * distance;
			const dy = Math.sin(angle) * distance;

			const frames = [
				{ translate: '0 0', scale: '1', opacity: 0, offset: 0 },
				{
					translate: `${(dx * 0.45).toFixed(1)}px ${(dy * 0.45 - 10).toFixed(1)}px`,
					scale: '1',
					opacity: 1,
					offset: 0.2,
				},
				{
					translate: `${(dx * 0.8).toFixed(1)}px ${(dy * 0.8 - 36).toFixed(1)}px`,
					scale: '0.7',
					opacity: 1,
					offset: 0.6,
				},
				{
					translate: `${dx.toFixed(1)}px ${(dy - 60).toFixed(1)}px`,
					scale: '0.1',
					opacity: 0,
					offset: 1,
				},
			];

			const animation = particle.animate(frames, {
				duration: 700 + Math.random() * 450,
				delay: Math.random() * 80,
				easing: 'ease-out',
				fill: 'backwards',
			});

			animation.finished.then(() => particle.remove()).catch(() => particle.remove());
		}
	};

	const flare = () => {
		if (!puff) return;

		puff.animate(
			[
				{ opacity: 0.7, scale: '1' },
				{ opacity: 1, scale: '2', offset: 0.3 },
				{ opacity: 0.8, scale: '1.4', offset: 0.65 },
				{ opacity: 0.6, scale: '1' },
			],
			{ duration: 1100, easing: 'ease-out' },
		);
	};

	let dimTimer: number | undefined;
	let sootTimer: number | undefined;
	let activeSoot: HTMLElement | undefined;

	const clearSootTimer = () => {
		if (sootTimer !== undefined) window.clearTimeout(sootTimer);

		sootTimer = undefined;
	};

	const disposeSoot = (node: HTMLElement) => {
		node.classList.remove('is-hot', 'is-scorched');
		window.setTimeout(() => node.remove(), 2800);
	};

	const markSoot = () => {
		clearSootTimer();

		if (activeSoot) disposeSoot(activeSoot);

		const node = document.createElement('div');

		node.className = 'page-soot';
		node.setAttribute('aria-hidden', 'true');
		node.style.translate = `${x}px ${y}px`;
		document.body.appendChild(node);

		activeSoot = node;

		// Commit the base (invisible) styles before enabling the mark, otherwise it pops in.
		void node.offsetWidth;
		node.classList.add('is-hot');

		sootTimer = window.setTimeout(() => {
			disposeSoot(node);
			activeSoot = undefined;
			sootTimer = undefined;
		}, 6000);
	};

	const sootBurst = () => {
		if (!activeSoot) return;

		const node = activeSoot;

		clearSootTimer();
		node.classList.remove('is-hot');
		node.classList.add('is-scorched');

		sootTimer = window.setTimeout(() => {
			disposeSoot(node);
			activeSoot = undefined;
			sootTimer = undefined;
		}, 8000);
	};

	const darken = () => {
		if (!dim) return;

		if (dimTimer !== undefined) window.clearTimeout(dimTimer);

		dim.classList.add('is-dim');

		dimTimer = window.setTimeout(() => {
			dim.classList.remove('is-dim');
			dimTimer = undefined;
		}, 1800);
	};

	let x = 0;
	let y = 0;
	let emitter: number | undefined;
	let surge: number | undefined;
	let gloom: number | undefined;
	let build: number | undefined;
	let stain: number | undefined;
	let pixelGlitch: number | undefined;
	let pixelFadeTimer: number | undefined;
	let msgTimer: number | undefined;
	let roaring = false;
	let tense = false;

	const clearPixelGlitch = () => {
		if (pixelGlitch !== undefined) window.clearTimeout(pixelGlitch);
		pixelGlitch = undefined;
	};

	const showDeadPixelMsg = (posX: number, posY: number) => {
		if (!deadPixelMsg) return;
		if (msgTimer !== undefined) window.clearTimeout(msgTimer);

		const width = deadPixelMsg.offsetWidth;
		const height = deadPixelMsg.offsetHeight;
		const offsetX = Math.max(8, Math.min(posX + 16, window.innerWidth - width - 8));
		const offsetY = Math.max(8, Math.min(posY + 16, window.innerHeight - height - 8));

		deadPixelMsg.style.translate = `${offsetX}px ${offsetY}px`;
		deadPixelMsg.classList.add('is-active');

		msgTimer = window.setTimeout(() => {
			deadPixelMsg.classList.remove('is-active');
			msgTimer = undefined;
		}, 6500);
	};

	const stop = () => {
		clearPixelGlitch();
		if (deadPixel?.classList.contains('is-active') && pixelFadeTimer === undefined) {
			const dropX = x;
			const dropY = y;
			pixelFadeTimer = window.setTimeout(() => {
				deadPixel.classList.remove('is-active');
				showDeadPixelMsg(dropX, dropY);
				pixelFadeTimer = undefined;
			}, 1600);
		}

		if (emitter !== undefined) window.clearInterval(emitter);
		if (surge !== undefined) window.clearTimeout(surge);
		if (gloom !== undefined) window.clearTimeout(gloom);
		if (build !== undefined) window.clearTimeout(build);
		if (stain !== undefined) window.clearTimeout(stain);
		if (dimTimer !== undefined) window.clearTimeout(dimTimer);

		emitter = undefined;
		surge = undefined;
		gloom = undefined;
		build = undefined;
		stain = undefined;
		dimTimer = undefined;
		roaring = false;
		tense = false;

		dim?.classList.remove('is-dim');
		reveal(false);
	};

	let activePointer: number | undefined;

	const release = () => {
		if (activePointer === undefined) return;

		activePointer = undefined;
		stop();
	};

	const cancelPress = () => {
		if (activePointer === undefined) return;

		clearPixelGlitch();

		if (pixelFadeTimer !== undefined) {
			window.clearTimeout(pixelFadeTimer);
			pixelFadeTimer = undefined;
		}

		deadPixel?.classList.remove('is-active');
		deadPixelMsg?.classList.remove('is-active');

		if (activeSoot) {
			clearSootTimer();
			activeSoot.remove();
			activeSoot = undefined;
		}

		release();
	};

	// Dragging to select text should never leave fire, dim, or scorch marks behind.
	document.addEventListener('selectionchange', () => {
		const selection = window.getSelection();

		if (selection && !selection.isCollapsed) cancelPress();
	});

	document.addEventListener(
		'pointerdown',
		(event) => {
			if (event.button !== 0 || reducedMotion()) return;

			// A second finger means a gesture (pinch, two-finger scroll), not a press.
			if (activePointer !== undefined || !event.isPrimary) {
				release();
				return;
			}

			activePointer = event.pointerId;

			stop();
			if (pixelFadeTimer !== undefined) {
				window.clearTimeout(pixelFadeTimer);
				pixelFadeTimer = undefined;
				deadPixel?.classList.remove('is-active');
			}
			x = event.clientX;
			y = event.clientY;

			place(x, y);
			reveal(true);

			spark(x, y, 14);

			emitter = window.setInterval(
				() => (tense ? spark(x, y, 4) : spark(x, y, roaring ? 4 : 3, roaring ? 1.5 : 1)),
				90,
			);

			build = window.setTimeout(() => {
				tense = true;
			}, 1500);

			stain = window.setTimeout(markSoot, 1000);

			surge = window.setTimeout(() => {
				tense = false;
				roaring = true;
				blast(x, y);
				flare();
				sootBurst();
			}, 3000);

			pixelGlitch = window.setTimeout(() => {
				if (!deadPixel) return;
				deadPixel.style.left = `${x}px`;
				deadPixel.classList.add('is-active');
			}, 7000);

			gloom = window.setTimeout(darken, 1900);
		},
		{ passive: true },
	);

	document.addEventListener(
		'pointermove',
		(event) => {
			if (event.pointerId !== activePointer || emitter === undefined) return;

			x = event.clientX;
			y = event.clientY;

			place(x, y);
		},
		{ passive: true },
	);

	document.addEventListener(
		'pointerup',
		(event) => {
			if (event.pointerId !== activePointer) return;

			release();
		},
		{ passive: true },
	);

	document.addEventListener(
		'pointercancel',
		(event) => {
			if (event.pointerId !== activePointer) return;

			release();
		},
		{ passive: true },
	);

	window.addEventListener('blur', release);

	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') release();
	});
};

initCursorFlame();
