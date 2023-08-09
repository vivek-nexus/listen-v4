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
        </head>
    )
}