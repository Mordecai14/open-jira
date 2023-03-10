import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { EntriesProvider } from '@/context/entries'
import { UIProvider } from '@/context/ui'
import { lightTheme, darkTheme } from '@/themes'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { dark } from '@mui/material/styles/createPalette'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  )
}
