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
        theme: themeStored || "light",
      };
    }
  } catch (e) {
    console.warn("Could not parse auth from localStorage");
  }
  return initialState;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem("auth", JSON.stringify({ 
        user: state.user,
        isAuthenticated: true 
      }));
    }
  }, [state.isAuthenticated, state.user]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}