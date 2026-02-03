import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({children}, role){
    const {state} = useContext(AuthContext);

    if(!state.isAuthenticated){
        return <Navigate to="/login" />
    }else if(role && !role.includes(state.role)){
        return <Navigate to="/unAuthorized" />
    }

    return children;
}