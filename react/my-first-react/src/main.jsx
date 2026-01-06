import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UseState from './UseState.jsx'
import './index.css'
import App from './App.jsx'
import Gallery from './Gallery.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
   
    <Gallery />
  </StrictMode>,
)
