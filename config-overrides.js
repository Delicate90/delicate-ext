const {injectBabelPlugin, getBabelLoader} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less-modules');

module.exports = function override(config, env) {

    const babelLoader = getBabelLoader(config.module.rules);
    babelLoader.options.babelrc = true;

    config = rewireLess(config, env);
    config = injectBabelPlugin(['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}], config);

    return config;
};