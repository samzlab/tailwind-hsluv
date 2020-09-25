module.exports = {
	parserOptions: {
		ecmaVersion: 2020, // 11
		sourceType: 'module'
	},
	env: {
		browser: true,
		es6: true
	},
	extends: [
		// add more generic rulesets here, such as:
		// 'eslint:recommended',
		'@koffeine',
		'plugin:vue/vue3-recommended'
	],
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
		'vue/no-multiple-template-root': 'off',
		'vue/valid-template-root': 'off',
		'vue/script-indent': [ 'error', 4, { baseIndent: 1 } ],
		'vue/html-indent': [ 'error', 4, { baseIndent: 1 } ],
		'vue/max-attributes-per-line': 'off',
		'no-bitwise': 'off',
		'func-style': 'off'
	},
	overrides: [
		{
			files: [ '*.vue' ],
			rules: {
				indent: 'off'
			}
		}
	]
};