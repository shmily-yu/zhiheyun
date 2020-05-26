const path = require("path");
const primaryColor = "#7851FD";
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/",
  outputDir: "./dist",
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("views", resolve("src/views"))
      .set("components", resolve("src/components"));
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 默认主题覆盖
          green: primaryColor,
          "nav-bar-title-text-color": "#FFFFFF",
          "nav-bar-title-font-size": "18px",
          "nav-bar-text-color": "#FFFFFF",
          // "nav-bar-background-color": primaryColor,
          "button-default-height": "45px",
          // "button-primary-background-color": primaryColor,
          // "button-primary-border-color": primaryColor,
          "active-color": "#FFFFFF20"
        }
      }
    }
  }
};
