module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/find-table/" : "/",
  css: {
    loaderOptions: {
      postcss: {
        autoprefixer: {}
      }
    }
  }
};
