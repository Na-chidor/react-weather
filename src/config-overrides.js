const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
    util: require.resolve('util'),
    url: require.resolve('url'),
    https: false,
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
