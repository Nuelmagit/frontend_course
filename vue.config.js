const { defineConfig } = require('@vue/cli-service')
const CopyPlugin = require("copy-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './build/dist/',
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "./cloud-app-stack.cf.json", to: "../cloud-app-stack.cf.json" },

        ]
      })
    ]
  }
})
