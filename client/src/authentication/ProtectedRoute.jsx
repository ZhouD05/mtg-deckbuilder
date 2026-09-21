import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { isLoggedIn } from "../services/auth";

function ProtectedRoute({ children }) {
    const { user, token } = useAuth();


    if (!token || !isLoggedIn()) {
        console.log(isLoggedIn())
        console.log(user)
        console.log("DENIED ACCESS")
        return <Navigate to={"/login"}/>;
    }
    console.log("ALLOWED ACCESS")

    return children;
}

export default ProtectedRoute;