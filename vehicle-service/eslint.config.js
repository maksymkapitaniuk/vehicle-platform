import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended, pluginImport.flatConfigs.recommended],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/core-modules': ['eslint/config'],
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'import/extensions': ['error', 'ignorePackages'],
    },
  },
]);
