const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/account', {
      target: 'https://account.kkbox.com/oauth2/token',
      changeOrigin: true,
      pathRewrite: {
        '^/account': '',
      },
    })
  );
  app.use(
    createProxyMiddleware('/kkboxApi', {
      target: 'https://api.kkbox.com/v1.1',
      changeOrigin: true,
      pathRewrite: {
        '^/kkboxApi': '',
      },
    })
  );
  app.use(
    createProxyMiddleware('/youtubeApi', {
      target: 'https://www.googleapis.com/youtube/v3',
      changeOrigin: true,
      pathRewrite: {
        '^/youtubeApi': '',
      },
    })
  );
};
