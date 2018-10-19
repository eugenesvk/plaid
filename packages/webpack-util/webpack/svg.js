// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
// const extractSVG = isProd;

module.exports = options => config => {
  const {
    svgDir,
  } = options;
  config.module = {
    ...config.module,
  };
  config.module.rules = [
    ...config.module.rules || [],
    {
      test: /\.svg$/,
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          // extract: extractSVG,
        },
      }],
      include: [svgDir],
    },
  ];
  config.plugins = [
    ...config.plugins || [],
    // extractSVG && new SpriteLoaderPlugin(),
  ].filter(Boolean);
  return config;
};
