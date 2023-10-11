import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import App from './src/app'
// import App from './src/app1'
// import App from './src/app2'
// import App from './src/app3'
// import App from './src/app4'
import App from './src/app5'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
