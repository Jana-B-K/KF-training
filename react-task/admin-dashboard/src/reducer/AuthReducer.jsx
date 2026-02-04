export const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  theme: "light", 
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload || "Invalid credentials",
      };
    case "LOGOUT":
      localStorage.removeItem("auth");
      return initialState;
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
}
