// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const sassLoaderSuffix = '?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=./node_modules';

module.exports = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: [
          autoprefixer({
            browsers: [
              'ie >= 9',
              'ie_mob >= 10',
              'ff >= 30',
              'chrome >= 34',
              'safari >= 7',
              'opera >= 23',
              'ios >= 7',
              'android >= 4.4',
              'bb >= 10'
            ]
          }),
          require('postcss-flexibility')
        ]
      }
    }),],
  module: {
    loaders: [
      {
        test: /\.(scss|sass|css)$/,
        loader: `style-loader!css-loader!postcss-loader!sass${sassLoaderSuffix}`
      }
    ],
  },
};
