const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  presets: [require.resolve('babel-preset-react-app')],
  // @remove-on-eject-begin
  babelrc: false,
  // @remove-on-eject-end
  configFile: false,
});
