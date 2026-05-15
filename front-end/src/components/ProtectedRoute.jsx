import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setAuth(false);
                return;
            }
            setAuth(true);
        };

        checkAuth();
    }, []);

    if (auth === null) {
        return <div>loading ...</div>; // Loading state while checking auth
    }

    if (auth === false) {
        return <Navigate to="/auth" />; // Redirect if not authenticated
    }

    return children; // Return children directly if authenticated
};

export default ProtectedRoute;
