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
      // webpackConfig.output.library = `${name}-[name]`;
      // webpackConfig.output.libraryTarget = 'umd';
      // webpackConfig.output.jsonpFunction = `webpackJsonp_${name}`;
      return webpackConfig;
    }
  },
  // webpack: {
  //   config: {
  //     output: {
  //       library: `${name}-[name]`,
  //       libraryTarget: 'umd',
  //       jsonpFunction: `webpackJsonp_${name}`,
  //     }
  //   }
  // },
  // webpack: function override(config, env) {
  //   console.log('ssSSSsssssssSSSsssssssSSSsssssssSSSsssss', config);
  //   config.output.library = `${name}-[name]`;
  //   config.output.libraryTarget = 'umd';
  //   config.output.jsonpFunction = `webpackJsonp_${name}`;
  //   return config;
  // },
  devServer: (config) => {
      config.open = false;
      config.hot = false;
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      return config;
  },
};
