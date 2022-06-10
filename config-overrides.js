const { override, addWebpackAlias } = require('customize-cra');
const {
  compilerOptions: { paths },
} = require('./jsconfig.json');
const path = require('path');

const aliasesMapper = (paths) =>
  Object.assign(
    {},
    ...Object.entries(paths).map((item) => {
      const key = item[0].replace('/*', '');
      const alias = item[1][0].replace('/*', '');
      return { [key]: path.resolve(__dirname, 'src/' + alias) };
    }),
  );

module.exports = override(addWebpackAlias(aliasesMapper(paths)));

//console.log(aliasesMapper(paths, SRC_PATHS));
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
