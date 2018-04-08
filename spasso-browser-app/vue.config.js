module.exports = {
  devServer: {
    port: 4200,
    proxy: {
      '/v1': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
}
