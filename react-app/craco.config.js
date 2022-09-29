const { name } = require('./package.json');

module.exports =  {
  webpack: {
    base: '/react-app',
    configure: (webpackConfig, {
      env, paths
    }) => {
      webpackConfig.output.library = `${name}-[name]`;
      webpackConfig.output.libraryTarget = 'umd';
      webpackConfig.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
      // webpackConfig.output.jsonpFunction = `webpackJsonp_${name}`;
      return webpackConfig;
    }
  },

  devServer: (config) => {
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      return config;
  },
};
