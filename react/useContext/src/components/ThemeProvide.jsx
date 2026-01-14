import { createContext, useState } from "react";

export const ThemeContext = createContext();
export const ThemeUpdateContext = createContext();

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme(prev => !prev);
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
