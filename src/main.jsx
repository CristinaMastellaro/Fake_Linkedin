import App from './App.jsx'
import CustomNavbar from './components/Navbar.jsx'
import NotFound from './components/NotFound.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(<App />)
