// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "vue/multi-word-component-names": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/html-self-closing":"off",
      "no-async-promise-executor": "off",
      "prefer-const": [
        "error",
        {
          destructuring: "all",
        },
      ],

      // "vue/no-parsing-error": "off",
      "no-undef": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
        },
      ],
    },
  }
)
