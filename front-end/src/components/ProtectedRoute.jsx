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
  return (
    <div>
      {auth === null ? (
        <div>loading ...</div>
      ) : auth === false ? (
        <Navigate to="/auth" />
      ) : (
        children
      )}
    </div>
  );
};

export default ProtectedRoute;
