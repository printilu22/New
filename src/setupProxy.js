const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_CRYPTO_API_URL || 'https://coinranking1.p.rapidapi.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      onProxyRes: function (proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    })
  );

  app.use(
    '/news-api',
    createProxyMiddleware({
      target: 'https://min-api.cryptocompare.com/data/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/news-api': '',
      },
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader('authorization', `Apikey ${process.env.REACT_APP_CRYPTOCOMPARE_API_KEY}`);
      },
      onProxyRes: function(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
      },
    })
  );
}; 