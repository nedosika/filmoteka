const path = require('path');
const createJestConfig = require('./node_modules/react-scripts/scripts/utils/createJestConfig.js');
const config = createJestConfig(
  (relativePath) => path.resolve('node_modules/react-scripts', '', relativePath),
  '',
  false,
);
module.exports = {
  ...config,
  moduleNameMapper: {
    '^components$': '<rootDir>/src/components/',
  },
  // transform: {
  //   '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/babelTransform.js',
  // },
  // transformIgnorePatterns: [
  //   //'node_modules/(?!ui-core)/',
  //   //'[/\\\\]node_modules[/\\\\].+.(js|jsx|mjs|cjs|ts|tsx)',
  //   // '^.+\\.module\\.(css|sass|scss)$',
  // ],
};
