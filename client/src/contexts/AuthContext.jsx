import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext(undefined);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/users/me`, {
            headers: {Authorization: token}
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setUser(data.user);
        })
    }, [])

    const value = {
        user,
        setUser,
        token,
        setToken
    }

    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}