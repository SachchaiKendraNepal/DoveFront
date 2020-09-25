module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		"plugin:vue/vue3-recommended"
	],
	parser: "vue-eslint-parser",
	rules: {
		indent: [
			"error",
			"tab"
		],
		"vue/html-indent": [
			"error",
			"tab",
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		"vue/script-indent": [
			"error",
			"tab",
			{
				baseIndent: 0,
				switchCase: 0,
				ignores: []
			}
		],
		"vue/max-attributes-per-line": [
			"error",
			{
				singleline: 1,
				multiline: {
					max: 2,
					allowFirstLine: true
				}
			}
		],
		"space-before-function-paren": ["error", {
			anonymous: "always",
			named: "never",
			asyncArrow: "always"
		}],
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"quotes": ["error", "double"]
	}
}
