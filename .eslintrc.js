/**
 * These rules enforce the AIRBNB Style Guide
 *
 */

module.exports = {
  extends: "airbnb",
  env: {
    "browser": true,
    "node": true,
    "jest": true,
  },
  rules: {
    "no-console": 0,
    "import/extensions": ["error", "never", { "jsx": "always" }],
    'no-plusplus': 'off',
    "no-param-reassign": 0,
  },
  "parser": "babel-eslint",
};

