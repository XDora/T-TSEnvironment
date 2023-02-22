const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://192.168.12.80:8000/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};
  