import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Auth = () => {
  const { authenticated, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://video-streaming.eastus.cloudapp.azure.com:3001/auth",
        {
          username: username,
          password: password,
        }
      );
      navigate("/");
      login();
    } catch (error) {
      console.error(error);
    }
    setUsername(null);
    setPassword(null);
  };
  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username || ""}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password || ""}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default Auth;
