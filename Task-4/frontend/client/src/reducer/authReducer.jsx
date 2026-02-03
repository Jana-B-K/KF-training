export const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

export function authReducer(state, action){
    switch(action.type) {
        case "LOGIN_START":
            return {...state, isLoading: true, error: null}
        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                error: action.payload,
            }
        case "LOG_OUT":
            return { initialState }
        default:
            throw new Error ("Unknown action error");
    }
}