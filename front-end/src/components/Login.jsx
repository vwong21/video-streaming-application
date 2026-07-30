import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const authURL = import.meta.env.VITE_AUTH_URL;

    const submitForm = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.post(authURL, {
                username: username,
                password: password,
            });
            const accessToken = res.data.accessToken;
            localStorage.setItem("token", accessToken);
            navigate("/");
        } catch (error) {
            console.error(error);
            setError("Couldn't log in. Check your username and password.");
        }
        setUsername(null);
        setPassword(null);
    };

    return (
        <form onSubmit={submitForm} id="auth_form">
            <div className="upload_field">
                <label htmlFor="username" className="upload_label">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="yourname"
                    className="upload_inputs"
                    value={username || ""}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
            </div>

            <div className="upload_field">
                <label htmlFor="password" className="upload_label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    className="upload_inputs"
                    value={password || ""}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>

            {error && <p id="upload_error">{error}</p>}

            <button type="submit" id="upload_button">
                Log in
            </button>
        </form>
    );
};

export default Login;
