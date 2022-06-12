const { override, addWebpackAlias } = require('customize-cra');
const aliasMapper = require('./aliasMapper');

const JS_CONFIG_PATH = './jsconfig.json';

module.exports = override(
  addWebpackAlias(
    aliasMapper(JS_CONFIG_PATH, {
      key: ['/*', ''],
      alias: ['/*', ''],
    }),
  ),
);

// console.log(
//   aliasMapper(JS_CONFIG_PATH, {
//     key: ['/*', ''],
//     alias: ['/*', ''],
//   }),
// );

// module.exports = override(
//   addWebpackAlias({
//     ['@Components']: path.resolve(__dirname, 'src/components/'),
//     ['@Actions']: path.resolve(__dirname, 'src/actions/'),
//     ['@Reducers']: path.resolve(__dirname, 'src/reducers/'),
//     ['@Hooks']: path.resolve(__dirname, 'src/hooks/'),
//     ['@Store']: path.resolve(__dirname, 'src/store/'),
//     ['@TestUtils']: path.resolve(__dirname, 'src/test-utils/'),
//   }),
// );
