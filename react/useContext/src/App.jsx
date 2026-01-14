import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { ThemeProvider } from './components/ThemeProvide'

function App() {


  return (
    <ThemeProvider>
      <Home  />
    </ThemeProvider>
  )
}

export default App
