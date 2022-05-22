module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': require.resolve('./node_modules/react-scripts/config/jest/babelTransform.js'),
    '^.+\\.css$': require.resolve('./node_modules/react-scripts/config/jest/cssTransform.js'),
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': require.resolve(
      './node_modules/react-scripts/config/jest/fileTransform.js',
    ),
    //'\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  //setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
    'node_modules/(?!ui-core)/',
  ],
};
