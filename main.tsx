import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
// import App from './src/app'
import App from './src/app2'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
