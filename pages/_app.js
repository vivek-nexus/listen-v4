import '../styles/globals.css'
import { ThemeProvider } from "fictoan-react"
import { DarkTheme } from "../styles/LizenTheme"

function MyApp({ Component, pageProps }) {
  return (
    <div style={{scrollBehavior:'smooth'}}>
      <ThemeProvider theme={DarkTheme}>
        <Component {...pageProps} />
    </ThemeProvider>
    </div>
  )
}

export default MyApp
