const { createTransformer } = require('babel-jest').default;

module.exports = createTransformer({
  presets: ['babel-preset-react-app'],
  plugins: ['@babel/plugin-transform-runtime'],
  babelrc: false,
  configFile: false,
});
