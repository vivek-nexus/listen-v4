/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    output: 'export',
    env: {
        // Sample LINK prefix: /listen
        // Do not add the slash at the last
        LINK_PREFIX: isProd ? "/listen" : ""
    },
    basePath: isProd ? '/listen' : '',
    assetPrefix: isProd ? '/listen' : '',
}

module.exports = nextConfig
