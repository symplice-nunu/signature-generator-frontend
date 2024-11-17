const { defineConfig } = require('@vue/cli-service')
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',  // Optional: If you want to remove the "/api" prefix
        },
      },
    },
  },
};
