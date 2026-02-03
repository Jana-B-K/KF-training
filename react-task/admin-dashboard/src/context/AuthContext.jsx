import { createContext, useReducer, useEffect } from "react";
import { initialState, authReducer } from "../reducer/AuthReducer";

export const AuthContext = createContext();

function getInitialState() {
  try {
    const stored = localStorage.getItem("auth");
    const themeStored = localStorage.getItem("theme");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        user: parsed.user,
        isAuthenticated: true,
        error: null,
        theme: themeStored === "dark" ? "dark" : "light", 
      };
    }
  } catch (e) {
    console.warn("Could not parse auth from localStorage");
  }
  return { ...initialState, theme: "light" }; 
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem("auth", JSON.stringify({ 
        user: state.user,
        isAuthenticated: true 
      }));
    } else if (!state.isAuthenticated) {
      localStorage.removeItem("auth");
    }
    
    // Always save theme
    localStorage.setItem("theme", state.theme);
  }, [state.isAuthenticated, state.user, state.theme]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
