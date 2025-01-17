module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
    extends: [
        "eslint:recommended",
      "some-other-config-you-use",
    "prettier"
  ], 
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};
