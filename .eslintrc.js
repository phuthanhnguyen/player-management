module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['jest.config.ts'],
  rules: {}
};
