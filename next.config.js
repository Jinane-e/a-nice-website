const path = require('path')

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',//https://res.cloudinary.com/dzwcje2w1/image/upload/quebec_wsr80l.jpg
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dzwcje2w1/image/upload/**',
      },
      {
        protocol: 'http',//https://res.cloudinary.com/dzwcje2w1/image/upload/quebec_wsr80l.jpg
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}