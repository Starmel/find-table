module.exports = {
  // assetsDir: "./",
  publicPath: process.env.NODE_ENV === "production" ? "/find-table/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_common.scss";
          `
      },
      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  }
};
