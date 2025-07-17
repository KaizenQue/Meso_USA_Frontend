const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/certs",
    createProxyMiddleware({
      target: "https://api.trustedform.com",
      changeOrigin: true,
    })
  );
};
