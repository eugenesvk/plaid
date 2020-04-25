const { loadProjectConfig, combineConfig, requireSilent } = require('../util');

async function modifyWebpackConfig(configurators, options = {}) {
  if (!configurators) configurators = [];
  else if (typeof configurators === 'function') configurators = [configurators];
  let { projectConfig } = options;
  if (!projectConfig) projectConfig = await loadProjectConfig();
  return combineConfig({}, [
    ...options.noDefaults ? [] : defaultConfiguratorList,
    ...configurators,
  ], projectConfig);
}

const nameMap = {
  html: './html',
  analyze: './analyze',
  common: './common',
  css: './css',
  less: './less',
  raw: './raw',
  svg: './svg',
  sw: './sw',
  url: './url',
  devServer: './dev-server',
  ...requireSilent('@gera2ld/plaid-vue/webpack'),
  ...requireSilent('@gera2ld/plaid-svelte/webpack'),
};

const configurators = Object.entries(nameMap)
.reduce((map, [key, value]) => {
  map[key] = require(value);
  return map;
}, {});

const defaultConfiguratorList = [
  configurators.common,
  configurators.css,
  configurators.url,
  configurators.raw,
  configurators.svg,
  configurators.devServer,
  process.env.RUN_ENV === 'analyze' && configurators.analyze,
  configurators.vue,
  configurators.svelte,
  configurators.html,
];

exports.configurators = configurators;
exports.defaultConfiguratorList = defaultConfiguratorList;
exports.modifyWebpackConfig = modifyWebpackConfig;
