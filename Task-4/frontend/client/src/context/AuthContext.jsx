import { createContext, useReducer, useEffect } from "react";
import { initialState, authReducer } from '../reducer/authReducer.jsx';

export const AuthContext = createContext();

export function AuthProvider( {children}) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const stored = localStorage.getItem("auth");
        if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "LOGIN_SUCCESS", payload: parsed });
        }
    }, []);

    retrun (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

