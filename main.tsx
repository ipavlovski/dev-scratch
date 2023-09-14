import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import App from './src/app'
import App from './src/original'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
