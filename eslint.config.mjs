import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import tailwind from 'eslint-plugin-tailwindcss';

export default [
	{
		ignores: ['dist/', '.astro/', 'node_modules/', '.vscode/', '.playwright-mcp/'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginAstro.configs['flat/recommended'],
	{
		files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
		plugins: {
			tailwindcss: tailwind,
		},
		settings: {
			tailwindcss: {
				cssConfigPath: './src/styles/global.css',
			},
		},
		rules: {
			'tailwindcss/classnames-order': 'warn',
			'tailwindcss/enforces-canonical-classname': 'warn',
			'tailwindcss/enforces-shorthand': 'warn',
			'tailwindcss/no-custom-classname': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
];
