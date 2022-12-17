module.exports = {
    async rewrites() {
      return [
        {
          source: '/pages/product/:path*',
          destination: 'http://localhost:3000/l/:pi*' // Proxy to Backend
        }
      ]
    }
  }