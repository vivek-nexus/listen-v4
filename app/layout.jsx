"use client"

import "./globals.css"
import 'material-icons/iconfont/material-icons.css';
import { Cabin, Figtree, Lexend, Sora } from "next/font/google"
import "animate.css";
import Head from "@/components/Head";
import { useEffect } from "react";
import Script from "next/script";

const cabin = Cabin({ subsets: ["latin"] })
const sora = Sora({ subsets: ["latin"] })
const figtree = Figtree({ subsets: ["latin"] })
const lexend = Lexend({ subsets: ["latin"] })



export default function RootLayout({ children }) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newURL = "https://vivek-nexus.github.io/listen/"
      const result = confirm("There's a new version of this tool. Would you like to use that?")
      if (result) {
        window.location.href = newURL
      }
    }, 1000)

    return (() => clearTimeout(timeout))
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramURLValue = searchParams.get("url")

    if (!paramURLValue || !paramURLValue.includes("corrieredellacalabria.it")) {
      // mouseflow analytics
      window._mfq = window._mfq || [];
      (function () {
        var mf = document.createElement("script");
        mf.type = "text/javascript"; mf.defer = true;
        mf.src = "//cdn.mouseflow.com/projects/d650c614-2064-44cc-804a-54644c37dd52.js";
        document.getElementsByTagName("head")[0].appendChild(mf);
      })();
    }
  }, [])

  return (
    <html lang="en">
      <Head />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7ZYB56R4BT"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-7ZYB56R4BT');
        `}
      </Script>
      <body
        className={`${figtree.className} animate__animated animate__fadeIn text-white/70 selection:bg-primary-800 selection:text-white/60`}
      >
        {children}
      </body>
    </html>
  )
}
