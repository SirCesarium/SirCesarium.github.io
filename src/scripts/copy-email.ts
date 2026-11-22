export const initCopyEmail = (): void => {
	const copyButton = document.querySelector<HTMLButtonElement>('[data-copy-email]');
	const copyStatus = document.querySelector<HTMLElement>('[data-copy-status]');

	if (copyButton) {
		const label = copyButton.querySelector<HTMLElement>('[data-copy-label]');
		const idle = label?.textContent?.trim() || 'copy';

		copyButton.addEventListener('click', async () => {
			const email = copyButton.dataset.email;

			if (!email || !label) return;

			try {
				if (!navigator.clipboard) throw new Error('Clipboard unavailable');

				await navigator.clipboard.writeText(email);

				label.textContent = 'copied';
				if (copyStatus) copyStatus.textContent = 'Email copied to clipboard.';
			} catch {
				label.textContent = 'copy failed';
				if (copyStatus) copyStatus.textContent = 'Could not copy the email. Select it manually.';
			}

			window.setTimeout(() => {
				label.textContent = idle;
				if (copyStatus) copyStatus.textContent = '';
			}, 2200);
		});
	}
};

initCopyEmail();
