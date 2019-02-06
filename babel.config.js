module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-react-native"],
    plugins: [
      "@babel/plugin-transform-flow-strip-types",
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties'
    ].map(require.resolve),
  }
};
