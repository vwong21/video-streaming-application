import { useState } from "react";
import "../App.css";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
    const [existingUser, setExistingUser] = useState(true);

    const toggleExistingUser = () => {
        setExistingUser(!existingUser);
    };

    return (
        <div id="auth_page">
            <div id="auth_card">
                <p id="auth_logo">
                    Stream<span id="title_accent">Shelf</span>
                </p>

                {existingUser ? (
                    <Login />
                ) : (
                    <Register onSuccess={() => setExistingUser(true)} />
                )}

                <p id="auth_toggle">
                    {existingUser
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}
                    <span onClick={toggleExistingUser} id="auth_toggle_link">
                        {existingUser ? "Register" : "Log in"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;
