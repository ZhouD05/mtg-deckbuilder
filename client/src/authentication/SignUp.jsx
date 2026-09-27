import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setLocalStorage } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState("");

    const [attempt, setAttempt] = useState("");
    const {setUser, setToken} = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect( () => {
        if (password !== passwordMatch) {
            setAttempt("Password does not match");
        } else {
            setAttempt("");
        }
    }, [password, passwordMatch])

    async function checkValidPassword(password) {
        const hasLetters = /[a-zA-Z]/
        const hasNumbers = /\d/;
        const hasSymbols = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;

        if (password.length < 6) {
            return "Password is less than 6 characters"
        } 

        if (!hasLetters.test(password)) {
            return "Password does not contain letters"
        }

        if (!hasNumbers.test(password)) {
            return "Password does not contain numbers"
        }

        if (!hasSymbols.test(password)) {
            return "Password does not contain symbols"
        }
        return "valid";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validity = await checkValidPassword(password);

        if (validity !== "valid") {
            setAttempt(validity);
            return;
        }

        const userCredentials = {
            "username": username,
            "password": password
        }

        try {
            const res = await fetch(`${apiUrl}/users/sign-up`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userCredentials)
            });

            const data = await res.json();

            if (!data.success) {
                setAttempt(data.msg);
                return;
            }

            setLocalStorage(data);
            setUser(data.user);
            setToken(data.token);
        } catch (error) {
            console.error(error);
        }

        navigate("/login");
    }

    return (
        <div className="auth">
            <div className="authForm">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                    <input 
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password"
                    />
                    <input 
                        type="password"
                        value={passwordMatch} 
                        onChange={(e) => setPasswordMatch(e.target.value)} 
                        placeholder="Confirm Password"
                    />

                    <button type="Submit">Sign Up</button>
                </form>
                <p id="attempt">{attempt}</p>
                
                <h3>Password should: </h3>
                <ul>
                    <li> Have 6 characters or more </li>
                    <li> Contain Letters </li>                    
                    <li> Contain numbers </li>
                    <li> Contain symbols </li>
                </ul>
            </div>
        </div>
    )
}