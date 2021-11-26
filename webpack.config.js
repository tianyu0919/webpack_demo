const path = require('path');
const RemoveStrict = require('./plugins/RemoveStrict');

module.exports = {
  mode: 'production',
  entry: [
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  useBuiltIns: "usage",
                  corejs: 2
                }
              ]
            ],
          }
        }
      }
    ]
  },
  plugins: [new RemoveStrict()]
}