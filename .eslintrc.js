/* eslint-disable indent */
/* eslint-disable linebreak-style */
module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		"@typescript-eslint"
	],
	extends: [
		'airbnb', 'airbnb-typescript',
	],
	env: {
		'node': true,
		'jasmine': true,
		'jquery': true,
		'browser': true,
		"es6": true
	},
	rules: {
		'no-use-before-define': 0,
		'func-names': 0,
		'prefer-arrow-callback': 0,
		'linebreak-style': ['error', 'unix'],
		'indent': ['error', 4],
		'@typescript-eslint/indent': ['error', 4],
		'no-var': 0,
		'max-len': 0,
		'guard-for-in': 0,
		'object-shorthand': 0,
		'no-restricted-syntax': 0,
		'prefer-template': 0,
		'import/no-amd': 0,
		'space-before-function-paren': 0,
		'jsx-a11y/href-no-hash': 'off',
		'jsx-a11y/anchor-is-valid': ['warn', {
			'aspects': ['invalidHref']
		}],
		'import/no-unresolved': 0,
		'import/extensions': 0,
		'curly': ['warn', 'multi'],
		'eol-last': 0,
		'no-new': 'warn'
	},
	globals: {
		'browser': false,
		'window': true,
		'document': true
	},
	parserOptions: {
		project: ['./tsconfig.json'],
	},
}