const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  const handleProxyResponse = (proxyRes) => {
    // Create new headers object instead of modifying existing one
    const newHeaders = {
      ...proxyRes.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Return new object with updated headers
    return {
      ...proxyRes,
      headers: newHeaders,
    };
  };

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'your-api-url',
      changeOrigin: true,
      onProxyRes: handleProxyResponse,
    }),
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
      onProxyRes(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
      },
    }),
  );
};
