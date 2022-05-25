import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";

import { API_URL } from "../utils/urls";
import { user } from "../reducers/user";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [switchMode, setSwitchMode] = useState("signup");

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <label htmlFor="signup">Sign up</label>
      <input
        id="signup"
        type="radio"
        checked={switchMode === "signup"}
        onChange={() => setSwitchMode("signup")}
      />
      <label htmlFor="login">Log in</label>
      <input
        id="login"
        type="radio"
        checked={switchMode === "login"}
        onChange={() => setSwitchMode("login")}
      />
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
