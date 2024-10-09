import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  const [existingUser, setExistingUser] = useState(true);

  const toggleExistingUser = () => {
    setExistingUser(!existingUser);
  };

  return (
    <>
      {existingUser ? <Login /> : <Register />}

      <p onClick={toggleExistingUser}>Register</p>
    </>
  );
};

export default Auth;
