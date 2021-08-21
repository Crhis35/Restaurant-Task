const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
    createProxyMiddleware('/server', {
      target: 'http://localhost:5000/api/v1',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    })
  );
};
