import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Contact from './components/Contact'
import Counter from './components/Counter'
import Todo from './components/Todo'
import './index.css'
import { createContext, useState } from 'react'

export const ThemeContext = createContext(); // Export it

function App() {
  const [theme, setTheme] = useState("light"); // Fixed: "light" instead of "theme"
  
  function toggleTheme() {
    setTheme(theme => (theme === "light") ? "dark" : "light");
  }
  
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}> {/* Fixed: Capital P in Provider */}
      <div className={theme === "light" ? "light-theme" : "dark-theme"}> {/* Apply theme class */}
        <BrowserRouter>
          <nav>
            <Link className="links" to="/">Home</Link>
            <Link className="links" to="/about">About</Link>
            <Link className="links" to="/contact">Contact</Link>
            <Link className="links" to="/counter">Counter</Link>
            <Link className="links" to="/todo">Todo List</Link>
            <Link className="links" to="/form">Form</Link>
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
            >
              {theme === "light" ? '🌙' : '☀️'}
            </button>
          </nav>
          
          <Routes>
            <Route path="/" element={<Home title="Home" content="This is home"/>} />
            <Route path="/about" element={<About title="About" content="This is about"/>} />
            <Route path="/contact" element={<Contact title="Contact" content="This is contact"/>} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>    
  )
}

export default App