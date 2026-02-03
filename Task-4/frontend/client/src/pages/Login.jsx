import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { login } from "../service/authService.jsx";

export default function Login() {
    const { dispatch } = useContext(AuthContext);

    async function  handleSubmit(e){
        dispatch({type: "LOGIN_START"});

        try{
            const data = {
                email: e.target.email.value,
                password: e.target.password.value,
            }

            const res = await login(data);
            localStorage.setItem("auth", JSON.stringify(res));
            dispatch({ type: "LOGIN_SUCCESS", payload: res });
            } catch (err) {
            dispatch({
                type: "LOGIN_ERROR",
                payload: err.response?.data?.message || "Login failed"
            });
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <input name="email" />
            <input type="password" name="password" />
            <button>Login</button>
        </form>
    );
}