import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const submitForm = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_REG_URL, {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
      });
    } catch (error) {
      console.error(error);
    }
    navigate("/Auth");
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

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName || ""}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName || ""}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email || ""}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
