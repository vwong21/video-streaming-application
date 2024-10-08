import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const authURL = import.meta.env.VITE_AUTH_URL;

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(authURL, {
        username: username,
        password: password,
      });
      const accessToken = res.data.token;
      localStorage.setItem("token", accessToken);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setUsername(null);
    setPassword(null);
  };

  return (
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
  );
};

export default Login;
