import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { setLocalStorage } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";


export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setUser, setToken, user, token} = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    function handleSubmit(e) {
        e.preventDefault();
        
        const userCredentials = {
            "username": username,
            "password": password
        }

        fetch(`${apiUrl}/users/log-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials)
            
        }).then((response) => {

            return response.json();

        }).then((data) => {

            setLocalStorage(data);
            setUser(data.user);
            setToken(data.token);
            console.log(user)
            console.log(token)
            navigate("/");

        }).catch((error) => console.error(error));

        console.log("Login")
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <button type="Submit">Log In</button>
            </form>

            <Link to="/signup">Sign Up</Link>
        </div>
    )
}