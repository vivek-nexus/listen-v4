// module.exports = {
//   reactStrictMode: true,
// }

// const withOffline = require("next-offline");

// // your next.js configs
// const nextConfig = {};

// module.exports = withOffline(nextConfig);

module.exports {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH
}