const { isProd, defaultOptions } = require('@gera2ld/plaid/util');

exports.defaultOptions = Object.assign(defaultOptions, {
  postcssLoader: {
    loader: 'postcss-loader',
    // Load options later to avoid circular dependencies
  },
  htmlOptions: {
    minify: isProd && {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
    },
    // template: require.resolve('../webpack/html/template.html'),
    meta: { viewport: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0' },
    css: [],
    js: [],
  },
  styleOptions: {
    extract: isProd,
  },
  lessLoader: {
    loader: 'less-loader',
    // For ant-design
    // options: {
    //   javascriptEnabled: true,
    //   modifyVars: {
    //     hd: '2px',
    //   },
    // },
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    quiet: true,
  },
  successInfo(config/*, options */) {
    return {
      messages: [
        'Envs:',
        `  NODE_ENV=${process.env.NODE_ENV || ''}`,
        `  BABEL_ENV=${process.env.BABEL_ENV || ''}`,
        `Application running at http://localhost:${config.devServer.port}`,
      ],
    };
  },
  externals: undefined,
  analyzer: {
    analyzerPort: 0,
  },
});
