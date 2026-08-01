module.exports = {
  root: true,

  env: {
    browser: true,
    es2023: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: ['./tsconfig.app.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },

  plugins: ['@typescript-eslint'],

  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier'],

  settings: {
    'import/resolver': {
      typescript: true,
    },

    react: {
      version: 'detect',
    },
  },

  rules: {
    'react/react-in-jsx-scope': 'off',

    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],

    'import/prefer-default-export': 'off',

    'react/require-default-props': 'off',

    '@typescript-eslint/consistent-type-imports': 'error',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
};
