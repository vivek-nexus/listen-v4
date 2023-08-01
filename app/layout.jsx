import "./globals.css"
import { Cabin } from "next/font/google"
import "animate.css";
import Head from "@/components/Head";

const cabin = Cabin({ subsets: ["latin"] })

// export const metadata = {
//   title: "Listen",
//   description: "Listen to articles, just like a podcast!",
//   keywords: ["Text to speech", "TTS", "Podcast", "Listen", "Read out loud", "Screen time"],
//   icons: {
//     icon: "/logo.png",
//     shortcut: "/logo.png",
//   },
//   themeColor: "#008080",
//   manifest: "https://nextjs.org/manifest.json",
//   openGraph: {
//     title: "Listen",
//     description: "Listen to articles, just like a podcast!",
//     url: "https://yakshag.github.io/listen",
//     siteName: "Listen",
//     images: [
//       {
//         url: "https://yakshag.github.io/listen/logo.png",
//         width: 800,
//         height: 600,
//       },
//     ],
//     locale: "en_IN",
//     type: "website",
//   },
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body
        className={`${cabin.className} overflow-y-hidden animate__animated animate__fadeIn text-white/80 selection:bg-primary-800 selection:text-white/60`}
      >
        {children}
      </body>
    </html>
  )
}
