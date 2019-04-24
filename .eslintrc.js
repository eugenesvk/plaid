module.exports = {
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
    semi: ['error', 'always'],
  },
};
