const path = require('path');
const src = path.resolve(__dirname, '../src');
// const prependSrc = pathStr => `${src}/${pathStr}`;

const base = extend => {
  const rules = [
    {
      test: /(\.js)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }],
    },
  ];

  if (extend.rules) {
    rules.push(...extend.rules);
  }

  return Object.assign({}, {
    context: path.resolve(__dirname, '../src'),
    entry: [
      'babel-polyfill',
      '../src/index.js'
    ],
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].min.js',
      library: 'dollidb',
      libraryTarget: 'umd',
    },
    devtool: 'source-map',
    target: 'node',
    resolve: {
      extensions: ['.js'],
      modules: [src, 'node_modules'],
      alias: {
        utils: '../src/utils',
      },
    },
    module: {
      rules,
    },
  }, extend.config);
};

module.exports = base;
