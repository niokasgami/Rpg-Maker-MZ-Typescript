/* eslint-disable no-undef */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules : {
      "@typescript-eslint/explicit-member-accessibility": "off"
    },
    ignorePatterns: ["lib/external/**"],
    overrides: [
      {
        // enable the rule specifically for TypeScript files
        files: ["*.ts", "*.tsx"],
        rules: {
          "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
              overrides: {
                constructors: "no-public"
              }
            }
          ]
        }
      }     
    ]
  };
