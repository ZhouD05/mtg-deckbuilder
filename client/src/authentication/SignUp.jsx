import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLocalStorage } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setUser, setToken} = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    function handleSubmit(e) {
        const userCredentials = {
            "username": username,
            "password": password
        }
        e.preventDefault();
        fetch(`${apiUrl}/users/sign-up`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setLocalStorage(data);
            setUser(data.user);
            setToken(data.token);
            console.log(localStorage.getItem("expires"))
        }).catch((error) => console.error(error));

        console.log("Signup")
        navigate("/login");
    }

    return (
        <div className="auth">
            <div className="authForm">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                    <button type="Submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}