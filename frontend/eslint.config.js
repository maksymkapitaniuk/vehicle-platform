import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginImport from 'eslint-plugin-import';
import { globalIgnores, defineConfig } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'build']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      pluginReactHooks.configs.flat['recommended-latest'],
      pluginReactRefresh.configs.vite,
      pluginImport.flatConfigs.react,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: '19.0',
      },
      'import/core-modules': ['eslint/config'],
      'import/resolver': {
        alias: {
          map: [['/', './public']],
        },
      },
    },
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-fragments': ['warn', 'syntax'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
      'react-refresh/only-export-components': 'warn',
      'import/no-unresolved': 'error',
      'import/extensions': ['error', 'ignorePackages'],
    },
  },
]);
