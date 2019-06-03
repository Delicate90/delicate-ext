module.exports = (env) => {
    if (env && env.NODE_ENV === 'production') {
        return require('./build/webpack.prod.config')
    } else {
        return require('./build/webpack.dev.config')
    }
};