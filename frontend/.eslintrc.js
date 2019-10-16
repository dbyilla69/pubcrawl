module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'airbnb',
	],
	globals: {
		Atomics:
			'readonly',
		SharedArrayBuffer:
			'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType:
			'module',
	},
	plugins: [
		'react',
	],
	rules: {
		indent: [
			'error',
			'tab',
		],
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-indent-props': [
			'error',
			'tab',
		],
		'react/display-name': 0,
		'no-tabs': 0,
		'func-names': 0,
		'consistent-return': 0,
		'react/prop-types': 0,
		'react/no-array-index-key': 0,
		'react/react-in-jsx-scope': 0,
		'no-unused-vars': [
			1,
			{
				ignoreSiblings: true,
				argsIgnorePattern:
					'res|next|^err',
			},
		],
		'react/jsx-one-expression-per-line': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'react/prefer-stateless-function': 0,
		'react/forbid-prop-types': 0,
		'react/no-unescaped-entities': 0,
		'react/destructuring-assignment': 0,
		'react/require-default-props': 0,
		'react/jsx-filename-extension': [
			1,
			{
				extensions: [
					'.js',
					'.jsx',
				],
			},
		],
		'max-len': [
			'error',
			120,
			2,
			{
				ignoreUrls: true,
				ignoreComments: false,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		],
	},
};
