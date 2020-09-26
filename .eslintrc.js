module.exports = {
	parserOptions: {
		ecmaVersion: 2020, // 11
		sourceType: 'module'
	},
	env: {
		node: true,
		es6: true
	},
	extends: [
		'@koffeine'
	],
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
		'no-bitwise': 'off',
		'func-style': 'off'
	}
};