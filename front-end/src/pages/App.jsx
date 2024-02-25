import { Router, Route, useNavigate } from "react-router-dom";

import "../App.css";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const authenticated = useAuth();
  useEffect(() => {
    if (!authenticated) {
      navigate("/auth");
      console.log(authenticated);
    }
  });

  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default App;
