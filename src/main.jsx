import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {HeroUIProvider} from '@heroui/react'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <HeroUIProvider>
      <App />
      </HeroUIProvider>
   
  </StrictMode>,
)
