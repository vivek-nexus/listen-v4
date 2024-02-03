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
      <Script>
        {`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_BvPTm6vzvUAlXGLUZlcA5zgpOmzpXEvB5OGlMqALHQi',{api_host:'https://app.posthog.com'})
        `}
      </Script>
      <Script>
        {`
          <!-- Hotjar Tracking Code for https://vivek-nexus.github.io/listen -->
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:2800643,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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
