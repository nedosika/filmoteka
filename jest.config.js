const path = require('path');
const {
  compilerOptions: { paths },
} = require('./jsconfig.json');
const createJestConfig = require('./node_modules/react-scripts/scripts/utils/createJestConfig.js');
const config = createJestConfig(
  (relativePath) => path.resolve('node_modules/react-scripts', '', relativePath),
  '',
  false,
);

const aliasesMapper = (paths) =>
  Object.assign(
    {},
    ...Object.entries(paths).map((item) => {
      const key = item[0].replace('/*', '/(.*)');
      const alias = item[1][0].replace('/*', '/$1');
      return { [key]: '<rootDir>/src/' + alias };
    }),
  );

module.exports = {
  ...config,
  moduleNameMapper: aliasesMapper(paths),
};

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
