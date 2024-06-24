// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/require-default-prop": "off",
      "vue/require-v-for-key": "off"
    }
  }
);
