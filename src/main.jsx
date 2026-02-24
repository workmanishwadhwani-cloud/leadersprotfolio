import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StytchProvider } from '@stytch/react'
import { stytch } from './lib/stytch.js'
import './index.css'
import App from './App.jsx'

import { ThemeProvider } from 'next-themes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StytchProvider stytch={stytch}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <App />
      </ThemeProvider>
    </StytchProvider>
  </StrictMode>,
)
