"use client"

import "./globals.css"
import 'material-icons/iconfont/material-icons.css';
import { Cabin } from "next/font/google"
import "animate.css";
import Head from "@/components/Head";
import { useEffect } from "react";

const cabin = Cabin({ subsets: ["latin"] })

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
      <body
        className={`${cabin.className} animate__animated animate__fadeIn text-white/70 selection:bg-primary-800 selection:text-white/60`}
      >
        {children}
      </body>
    </html>
  )
}
