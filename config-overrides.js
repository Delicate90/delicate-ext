const {override, addLessLoader, fixBabelImports, addDecoratorsLegacy, useBabelRc} = require('customize-cra');

module.exports = override(
    useBabelRc(),
    addDecoratorsLegacy(),
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        modifyVars: {"@primary-color": "#52c41a"},
        javascriptEnabled: true,
    })
);