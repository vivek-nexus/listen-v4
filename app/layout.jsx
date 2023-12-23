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
    window._mfq = window._mfq || [];
    (function () {
      var mf = document.createElement("script");
      mf.type = "text/javascript"; mf.defer = true;
      mf.src = "//cdn.mouseflow.com/projects/d650c614-2064-44cc-804a-54644c37dd52.js";
      document.getElementsByTagName("head")[0].appendChild(mf);
    })();
  })

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

          // Check if the app is running as a standalone PWA
          if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log("This is running as standalone (PWA).");
            gtag('event', 'pwa_launch', {
              'event_category': 'PWA Events',
              'event_label': 'PWA User'
            });
            gtag('event', 'total_users', {
              'event_category': 'PWA Events',
              'event_label': 'User'
            });
          } else {
            // If not a PWA launch, only increment the custom metric for total users
            console.log("This is not a PWA.");
            gtag('event', 'total_users', {
              'event_category': 'PWA Events',
              'event_label': 'User'
            });
          }
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



