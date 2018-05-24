module.exports = {
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
    ]
  }
};