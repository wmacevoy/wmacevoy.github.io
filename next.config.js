// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

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
            "/print-schedule": {page: "/print-schedule"},
        }
    },
    turbopack: {}
}
