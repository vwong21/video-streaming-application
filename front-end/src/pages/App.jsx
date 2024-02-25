import { Router, Route, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { authenticated, login } = useAuth();
  useEffect(() => {
    if (authenticated == false) {
      navigate("/auth");
    } else {
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
