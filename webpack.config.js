const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 'production' か 'development' を指定
const MODE = 'development';
const enabledSourceMap = (MODE === 'development');

module.exports = {
  mode: MODE,
  output: {
    path: __dirname + '/docs' // GitHub pages
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.min.js',
          global: 'Vue',
        },
        {
          module: 'google-roboto',
          entry: {
            path: 'https://fonts.googleapis.com/css?family=Roboto',
            type: 'css',
          },
        },
        {
          module: 'google-noto',
          entry: {
            path: 'https://fonts.googleapis.com/css?family=Noto+Sans',
            type: 'css',
          },
        }
      ]
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              minimize: true,
              sourceMap: enabledSourceMap,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            }
          },
          // PostCSSを使ってAutoprefixerを有効にする
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({grid: true})
              ]
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            }
          }
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  }
};