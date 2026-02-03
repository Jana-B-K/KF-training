export const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token || action.payload.Token, // handles both login & refresh
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "LOG_OUT":
      return initialState;

    default:
      return state; // ✅ was: throw new Error — breaks on unknown actions
  }
}