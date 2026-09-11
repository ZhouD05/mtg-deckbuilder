import { Navigate } from "react-router-dom"
import { isLoggedIn } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
    const { token } = useAuth();
    if (!token) {
        console.log("DENIED ACCESS")
        return <Navigate to={"/login"}/>;
    }
    console.log("ALLOWED ACCESS")

    return children;
}

export default ProtectedRoute;