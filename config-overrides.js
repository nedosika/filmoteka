// const { alias, configPaths, aliasJest } = require('react-app-rewire-alias');
//
// const aliasMap = configPaths('./jsconfig.paths.json'); // or jsconfig.paths.json
//
// module.exports = alias(aliasMap);
// module.exports.jest = aliasJest(aliasMap);

const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['Components']: path.resolve(__dirname, 'src/components/'),
    ['Store']: path.resolve(__dirname, 'src/store/'),
  }),
);
