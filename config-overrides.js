const { alias, configPaths, aliasJest } = require('react-app-rewire-alias');

const aliasMap = configPaths('./jsconfig.paths.json'); // or jsconfig.paths.json

module.exports = alias(aliasMap);
module.exports.jest = aliasJest(aliasMap);

// const { override, addWebpackAlias } = require('customize-cra');
// const path = require('path');
//
// module.exports = override(
//   addWebpackAlias({
//     ['@components']: path.resolve(__dirname, './src/components'),
//     ['@store']: path.resolve(__dirname, './src/store'),
//   }),
// );
