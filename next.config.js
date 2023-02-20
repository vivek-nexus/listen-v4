// module.exports = {
//   reactStrictMode: true,
// }

// const withOffline = require("next-offline");

// // your next.js configs
// const nextConfig = {};

// module.exports = withOffline(nextConfig);

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  basePath: isProd ? '/listen' : '',
  assetPrefix: isProd ? '/listen/' : '',
  
}