import axios from "axios";
import React, { useState } from "react";

const Register = ({ onSuccess }) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);

    const submitForm = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post(import.meta.env.VITE_REG_URL, {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password,
                email: email,
            });
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            setError("Couldn't create your account. Try again.");
        }
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

            <div id="auth_name_row">
                <div className="upload_field">
                    <label htmlFor="firstName" className="upload_label">
                        First name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First"
                        className="upload_inputs"
                        value={firstName || ""}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </div>

                <div className="upload_field">
                    <label htmlFor="lastName" className="upload_label">
                        Last name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last"
                        className="upload_inputs"
                        value={lastName || ""}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="upload_field">
                <label htmlFor="email" className="upload_label">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    className="upload_inputs"
                    value={email || ""}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>

            {error && <p id="upload_error">{error}</p>}

            <button type="submit" id="upload_button">
                Register
            </button>
        </form>
    );
};

export default Register;
