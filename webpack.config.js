const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'), // Change this to the path of your entry file
  output: {
    filename: 'bundle.index.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  module: {
    rules: [
        {
            test:/\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
    ]
  }
};