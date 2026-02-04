export const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  theme: localStorage.getItem("theme") || "light",
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
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload || "Invalid credentials",
      };
    case "LOGOUT":
      localStorage.removeItem("auth");
      return { ...initialState, theme: state.theme };
    case "TOGGLE_THEME":
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { ...state, theme: newTheme };
    default:
      return state;
  }
}