module.exports = {
  root: true,
  env: {
    browser: false,
    es2017: true,
    node: false,
    googleappsscript: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'script', // Apps Script uses script mode, not module
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-var-requires': 'off', // May be needed for Apps Script

    // General JavaScript rules
    'no-console': 'off', // Console.log is standard in Apps Script
    'no-var': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],

    // Apps Script specific adjustments
    'no-undef': 'off', // Apps Script globals handled by @types/google-apps-script
    'no-unused-vars': 'off', // Use TypeScript version instead

    // Code style
    'indent': 'off', // Handled by Prettier
    'quotes': 'off', // Handled by Prettier
    'semi': 'off', // Handled by Prettier
    'comma-dangle': 'off', // Handled by Prettier
    'max-len': 'off', // Handled by Prettier

    // Best practices for Apps Script
    'no-throw-literal': 'error',
    'prefer-template': 'error',
    'no-duplicate-imports': 'error',

    // Allow Google Apps Script global functions
    'no-global-assign': ['error', { exceptions: [] }],
    'no-implicit-globals': 'off',
  },
  globals: {
    // Google Apps Script globals (supplement @types/google-apps-script)
    console: 'readonly',
    Logger: 'readonly',
    Session: 'readonly',
    Utilities: 'readonly',
    UrlFetchApp: 'readonly',
    SpreadsheetApp: 'readonly',
    DriveApp: 'readonly',
    GmailApp: 'readonly',
    HtmlService: 'readonly',
    ScriptApp: 'readonly',
    PropertiesService: 'readonly',
    CacheService: 'readonly',
    LockService: 'readonly',

    // HTML Service globals
    google: 'readonly',

    // Common Apps Script functions
    onOpen: 'readonly',
    onEdit: 'readonly',
    onFormSubmit: 'readonly',
    doGet: 'readonly',
    doPost: 'readonly',
  },
  overrides: [
    {
      // Specific rules for test files (if any)
      files: ['**/*.test.ts', '**/*.spec.ts'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      // Configuration files
      files: ['.eslintrc.js', '*.config.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    '*.js', // Ignore compiled JavaScript files
  ],
};
