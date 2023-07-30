/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    env: {
        // Sample LINK prefix: /project-pratima
        // Do not add the slash at the last
        LINK_PREFIX: isProd ? "/project-pratima" : ""
    },
    basePath: isProd ? '/listen' : '',
    assetPrefix: isProd ? '/listen' : '',
}

module.exports = nextConfig
