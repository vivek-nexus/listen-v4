import { env } from "@/next.config";

export default function Head() {
    return (
        <head>
            <title>Listen</title>
            <meta name="description" content="Your own podcast buddy!" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href={`${env.LINK_PREFIX}/logo.png`} />
            {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" /> */}
            {/* https://melvingeorge.me/blog/nextjs-pwa */}
            {/* <link rel="manifest" href="/manifest.json" /> */}
            <meta name="theme-color" content="#00a885" />
            {/* Open graph tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Listen" />
            <meta property="og:url" content="https://yakshag.github.io/listen/" />
            <meta property="og:image" content="https://yakshag.github.io/listen/link-preview.png" />
            <meta property="og:description" content="Your own podcast buddy!" />
        </head>
    )
}