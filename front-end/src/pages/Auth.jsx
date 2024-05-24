import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Login from "../components/Login";

const Auth = () => {
  const [existingUser, setExistingUser] = useState(true);

  const toggleExistingUser = () => {
    setExistingUser(!existingUser);
  };

  return (
    <>
      <Login />
      <p onClick={toggleExistingUser}>Register</p>
    </>
  );
};

export default Auth;
