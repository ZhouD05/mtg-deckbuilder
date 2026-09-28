import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { isLoggedIn } from "../services/auth";

function ProtectedRoute({ children }) {
    const { token } = useAuth();

    if (!token || !isLoggedIn()) {
        return <Navigate to={"/login"}/>;
    }

    return children;
}

export default ProtectedRoute;