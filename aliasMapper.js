const path = require('path');

module.exports = (jsConfigPath, replacers) => {
  const { paths } = require(jsConfigPath).compilerOptions;

  return Object.assign(
    {},
    ...Object.entries(paths).map(([aliasName, [aliasPath]]) => {
      const key = aliasName.replace(...replacers.key);
      const alias = aliasPath.replace(...replacers.alias);
      return { [key]: path.resolve(__dirname, 'src/' + alias) };
    }),
  );
};
