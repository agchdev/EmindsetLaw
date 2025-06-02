import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.css' // Estilos globales para la barra de desplazamiento
import App from './App.jsx'

// Importar configuración de i18n
import './i18n/i18n.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
