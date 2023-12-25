import { env } from "@/next.config";

export default function Head() {
    return (
        <head>
            <title>Listen</title>
            <meta name="description" content="Stop long form reading, cut screen time and start listening!" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href={`${env.LINK_PREFIX}/logo.png`} />
            {/* https://melvingeorge.me/blog/nextjs-pwa */}
            <link rel="manifest" href={`${env.LINK_PREFIX}/manifest.json`} />
            <meta name="theme-color" content="#00a885" />
            {/* Open graph tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Listen" />
            <meta property="og:url" content="https://vivek-nexus.github.io/listen/" />
            <meta property="og:image" content="https://vivek-nexus.github.io/listen/link-preview.png" />
            <meta property="og:description" content="Stop long form reading, cut screen time and start listening!" />
        </head>
    )
}