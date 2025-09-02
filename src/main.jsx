import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(<App />)
