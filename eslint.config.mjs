import prettier from 'eslint-plugin-prettier';
import cypress from 'eslint-plugin-cypress';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules',
      '**/downloads',
      '**/reports',
      '**/screenshots',
      '**/.vscode',
    ],
  },
  ...compat.extends('eslint:recommended', 'plugin:prettier/recommended'),
  {
    plugins: {
      prettier,
      cypress,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...cypress.configs.globals.languageOptions.globals,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      ...cypress.configs.recommended.rules,
      'prettier/prettier': 'error',
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-async-tests': 'error',
      'cypress/require-data-selectors': 'off',
      'cypress/no-pause': 'error',
      'cypress/unsafe-to-chain-command': 'off',
    },
  },
];
