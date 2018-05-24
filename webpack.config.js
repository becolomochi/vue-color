const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
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
        }
      ]
    }),
  ],
  output: {
    path: __dirname + '/docs' // GitHub pages
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {url: false}},
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  }
};