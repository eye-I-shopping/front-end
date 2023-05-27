const { createProxyMiddleware } = require("http-proxy-middleware");

const setupProxy = (app) => {
  app.use(
    "/root",
    createProxyMiddleware({
      target: "root",
      changeOrigin: true,
    })
  );
};

module.exports = setupProxy;
