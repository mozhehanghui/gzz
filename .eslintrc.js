const fs = require('fs')
const path = require('path')

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
)

module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['prettier', 'jsdoc'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/alt-text': 'off',
    'import/no-anonymous-default-export': 'off',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
}
