// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

const debug = process.env.NODE_ENV !== "production";

module.exports = {
    output: 'export',
    exportPathMap: function () {
        return {
            "/": { page: "/home" },
            "/home": { page: "/home" },
            "/teaching": {page: "/teaching"},
            "/research": {page: "/research"},
            "/resources": {page: "/resources"},
            "/contact":{page: "/contact"},
        }
    },
    assetPrefix: !debug ? '/next-homepage/' : '',
    webpack: (config, { dev }) => {
        // Perform customizations to webpack config
        // console.log('webpack');
        // console.log(config.module.rules, dev);
        config.module.rules = config.module.rules.map(rule => {
            if(rule.loader === 'babel-loader') {
                rule.options.cacheDirectory = false
            }
            return rule
        })
        // Important: return the modified config
        return config
    }
}
