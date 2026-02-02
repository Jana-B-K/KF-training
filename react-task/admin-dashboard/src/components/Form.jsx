import { useReducer, useContext } from "react";

function reducerFunction(state, action) {

}
const Form = () => {
    const [state, dispatch] = useReducer(reducerFunction,null)
    return (
        <form className="form" onSubmit={handleSubmit} >
            <input type="text" name="username" value={username} />
            <input type="password" name="password" value={password} />
            <button>submit</button>
        </form>
    )
}