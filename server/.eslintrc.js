module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "tsconfigRootDir": __dirname,
    "project": './tsconfig.json',
    "sourceType": "module",
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "semi": ["error", "always"],
    "indent": ["error", 2],
    "dot-notation": "off",
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-case-declarations": "off",
    "@typescript-eslint/no-explicit-any": 2
  },
  "ignorePatterns": [".eslintrc.js"]
};
