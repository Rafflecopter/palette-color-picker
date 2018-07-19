module.exports = {
    env: {
      node: true,
      browser: true,
      es6: true
    },

    plugins: [
      "react"
    ],

    extends: [
      "eslint:recommended",
      "plugin:react/recommended"
    ],

    parserOptions: {
      ecmaVersion: 8,
      ecmaFeatures: {
        jsx: true,
        modules: true,
        spread: true,
        restParams: true
      },
      sourceType: "module" },

    rules: {
      "space-before-function-paren": ["error", "never"],
      "indent": [ "error", 2 ],
      "linebreak-style": [ "error", "unix" ],
      "quotes": [ "error", "single", {avoidEscape: true} ],
      "semi": [ "error", "never" ],
      "comma-dangle": ["error", {
        arrays: "always-multiline",
        objects: "always-multiline"
      }],

      "no-console": ["error", {allow: ["warn", "error"]}],
    }
}

