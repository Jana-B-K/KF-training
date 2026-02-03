import { createContext, useReducer } from "react";
import { initialState, authReducer } from '../reducer/authReducer.jsx';

export const AuthContext = createContext();

// ✅ Read localStorage ONCE at module load — synchronous, runs before first render.
// The old version used useEffect which is async — on page refresh React renders
// ProtectedRoute BEFORE useEffect fires, sees isAuthenticated=false, and redirects.
function getInitialState() {
  try {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        user: parsed.user,
        token: parsed.token || parsed.Token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    }
  } catch (e) {
    // bad data in localStorage — ignore it
    console.warn("Could not parse auth from localStorage");
  }
  return initialState;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}