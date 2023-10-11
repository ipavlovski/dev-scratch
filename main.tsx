import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import App from './src/app'
// import App from './src/app1'
import App from './src/app2'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
