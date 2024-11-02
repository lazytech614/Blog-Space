import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FeedContextProvider } from './context/BlogContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <FeedContextProvider>
        <App />
      </FeedContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
