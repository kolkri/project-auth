import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import styled from "styled-components";

import { API_URL } from "../utils/urls";
import { user } from "../reducers/user";

const Container = styled.div``;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

// const Submitbutton = styled.button`
//   background: lightgrey;
//   border-radius: 3px;
//   color: black;
//   font-weight: bold;
//   margin: 0 1em;
//   padding: 0.25em 1em;
//   width: 5rem;
// `;

export const Signup = () => {
  const [username, setUsername] = useState("");
  // // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [switchMode, setSwitchMode] = useState("signup");

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToggleClick = () => {
    if (switchMode === "login") {
      setSwitchMode("signup");
      setIsContainerActive(true);
    } else {
      setSwitchMode("login");
      setIsContainerActive(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ username, email, password }),
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(switchMode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            // dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            // dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <section>
      <Container>
        <FormContainer onSubmit={onFormSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Submitbutton type="submit">Submit</Submitbutton> */}
          <button onClick={onToggleClick} id="signup">
            signup
          </button>
          {/* <label htmlFor="signup">Sign up</label>
          <input
            id="signup"
            type="radio"
            checked={switchMode === "signup"}
            onChange={() => setSwitchMode("signup")}
          /> */}
        </FormContainer>

        <FormContainer onSubmit={onFormSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Submitbutton type="submit">Login</Submitbutton> */}
          <button onClick={onToggleClick} id="login">
            login
          </button>
          {/* <label htmlFor="login">Log in</label>
          <input
            id="login"
            type="radio"
            checked={switchMode === "login"}
            onChange={() => setSwitchMode("login")} 
          /> */}
        </FormContainer>
      </Container>
    </section>
  );
};
