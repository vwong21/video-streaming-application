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

      try {
        const res = await axios.get(import.meta.env.VITE_PROTECTED_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuth(res.status === 200);
      } catch (error) {
        console.error(error);
        setAuth(false);
      }
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
