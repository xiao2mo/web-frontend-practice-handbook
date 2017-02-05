// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const plugins = require('../dev-config/webpack/plugins');

module.exports = {
  plugins: plugins.devPlugins,
  module: {
    loaders: [
      {
        test: /\.(scss|sass|css)$/,
        loader: 'style-loader!css-loader!postcss-loader!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=./node_modules'
      }
    ],
  },
};
