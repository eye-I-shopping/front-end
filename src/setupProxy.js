const { createProxyMiddleware } = require("http-proxy-middleware");

const setupProxy = (app) => {
  app.use(
    "/tts-premium",
    createProxyMiddleware({
      target: "https://naveropenapi.apigw.ntruss.com",
      changeOrigin: true,
    })
  );
};

module.exports = setupProxy;
