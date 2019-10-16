module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: [
		'airbnb-base',
	],
	globals: {
		Atomics:
			'readonly',
		SharedArrayBuffer:
			'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		indent: [
			'error',
			'tab',
		],
		'no-tabs': 0,
		'no-console': 0,
		camelcase: 0,
		'no-return-assign': [
			'error',
			'except-parens',
		],
		'no-param-reassign': 0,
		'no-unused-vars': [
			1,
			{
				ignoreSiblings: true,
				argsIgnorePattern:
					'res|next|^err|parent|args|ctx|info',
			},
		],
		'arrow-body-style': [
			2,
			'as-needed',
		],
	},
};
