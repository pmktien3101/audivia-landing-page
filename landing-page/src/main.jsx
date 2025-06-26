import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
const CLIENT_ID = import.meta.env.VITE_PUBLIC_GOOGLE_WEB_CLIENT_ID
createRoot(document.getElementById('desktop')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
