const path = require('path');
const aliasMapper = require('./aliasMapper');

const JS_CONFIG_PATH = './jsconfig.json';

const createJestConfig = require('./node_modules/react-scripts/scripts/utils/createJestConfig.js');

const config = createJestConfig(
  (relativePath) => path.resolve('node_modules/react-scripts', '', relativePath),
  '',
  false,
);

module.exports = {
  ...config,
  moduleNameMapper: aliasMapper(JS_CONFIG_PATH, {
    key: ['/*', '/(.*)'],
    alias: ['/*', '/$1'],
  }),
};

// console.log(
//   aliasMapper(JS_CONFIG_PATH, {
//     key: ['/*', '/(.*)'],
//     alias: ['/*', '/$1'],
//   }),
// );

// module.exports = {
//     ...config,
//     moduleNameMapper: {
//         '@Components/(.*)': '<rootDir>/src/components/$1',
//         '@Reducers/(.*)': '<rootDir>/src/reducers/$1',
//         '@Actions/(.*)': '<rootDir>/src/actions/$1',
//         '@Hooks/(.*)': '<rootDir>/src/hooks/$1',
//         '@Store': '<rootDir>/src/store',
//         '@TestUtils/(.*)': '<rootDir>/src/test-utils/$1',
//     },
// };
