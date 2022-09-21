module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        'no-console': ['error'],
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        'no-unused-expressions': 'off',
        'prefer-const': 'error',
        'no-spaced-func': 'off',
        'react/no-did-update-set-state': 'off',
        'react/no-did-mount-set-state': 'off',
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '[iI]gnored'}],
        '@typescript-eslint/no-unused-expressions': ['error', {allowShortCircuit: false}],
        '@typescript-eslint/consistent-type-imports': 'error',
        'react/no-unstable-nested-components': 'off',
    },
};
