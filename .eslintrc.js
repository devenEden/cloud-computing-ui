module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".json"] },
    ],
    "react/jsx-props-no-spreading": ["error", { custom: "ignore" }],
    "object-curly-newline": ["off", { multiline: true }],
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-curly-newline": "off",
    "react/destructuring-assignment": "off",
    "no-param-reassign": [2, { props: false }],
    "function-paren-newline": "off",
    "no-console": "warn",
    "no-undef": "error",
    "react/display-name": "error",
    "react/prop-types": "warn",
    "arrow-body-style": 0,
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
  },
};
