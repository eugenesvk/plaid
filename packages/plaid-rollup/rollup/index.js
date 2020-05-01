const babel = require('rollup-plugin-babel');
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');
const json = require('@rollup/plugin-json');
const pkg = require('../package.json');

const values = {
  'process.env.VERSION': pkg.version,
};

const rollupPluginMap = {
  postcss: options => require('rollup-plugin-postcss')({
    ...options,
  }),
  alias: aliases => alias(aliases),
  babel: ({ babelConfig, esm, extensions }) => babel({
    // import helpers from '@babel/runtime'
    runtimeHelpers: true,
    plugins: [
      [require.resolve('@babel/plugin-transform-runtime'), {
        useESModules: esm,
        version: '^7.5.0', // see https://github.com/babel/babel/issues/10261#issuecomment-514687857
      }],
    ],
    exclude: 'node_modules/**',
    extensions,
    ...babelConfig,
  }),
  replace: (replaceValues) => replace({
    values: {
      ...values,
      ...replaceValues,
    },
  }),
  resolve: ({ extensions }) => resolve({ extensions }),
  commonjs: () => commonjs(),
  json: () => json(),
};

function getRollupPlugins({
  babelConfig,
  esm,
  aliases,
  extensions,
  replaceValues,
  postcss = true,
} = {}) {
  return [
    aliases && rollupPluginMap.alias(aliases),
    postcss && rollupPluginMap.postcss(postcss),
    rollupPluginMap.babel({ babelConfig, esm, extensions }),
    rollupPluginMap.replace(replaceValues),
    rollupPluginMap.resolve({ extensions }),
    rollupPluginMap.commonjs(),
    rollupPluginMap.json(),
  ].filter(Boolean);
}

function getRollupExternal(externals = []) {
  return id => {
    if (/^@babel\/runtime[-/]/.test(id)) return true;
    return externals.some(pattern => {
      if (pattern && typeof pattern.test === 'function') return pattern.test(id);
      return id === pattern || id.startsWith(pattern + '/');
    });
  };
}

exports.getRollupPlugins = getRollupPlugins;
exports.getRollupExternal = getRollupExternal;
