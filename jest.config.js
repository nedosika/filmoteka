// const { defaults } = require('jest-config');
// console.log(defaults);
//
// module.exports = {
//   testEnvironment: 'jest-environment-jsdom',
//   transform: {
//     '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
//     //'^.+\\.(js|jsx)$': '<rootDir>/node_modules/webpack-babel-jest',
//   },
//   transformIgnorePatterns: ['node_modules/', 'node_modules/(?!ui-core)/'],
// };

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['node_modules/(?!ui-core)/'],
};
