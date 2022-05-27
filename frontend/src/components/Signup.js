import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import styled from "styled-components/macro";

import { API_URL } from "../utils/urls";
import { user } from "../reducers/user";

const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: -20px 0 50px;
`;

const FormContainer = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: ${(props) => (props.Mode ? "#1a73e8" : "transparent")};
  color: #fff;
  border: 3px solid ${(props) => (props.Mode ? "#1a73e8" : "#fff")};
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 20px;
  transition: transform 80ms ease-in;
  padding: 12px 24px;

  &:active {
    transform: scale(0.95);
  }
`;

const FormP = styled.p`
  color: #a7a7a7;
  margin: 16px 0;
`;

const InfoP = styled.p`
  color: #fff;
  margin: 16px 0;
`;

const ErrorMessageContainer = styled.div`
  position: absolute;
  bottom: 40px;
  padding: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  align-self: flex-end;
`;

// const InputContainer = styled.div`
//   position: relative;
// `;

// const UserLabel = styled.label`
//   position: absolute;
//   left: 15px;
//   color: #e8e8e8;
//   pointer-events: none;
//   transform: translateY(1rem);
//   transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
// `;

// const UserInput = styled.input`
//   border: solid 1.5px #9e9e9e;
//   border-radius: 1rem;
//   background: none;
//   padding: 1rem;
//   font-size: 1rem;
//   color: #f5f5f5;
//   transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);

//   &:focus,
//   &:valid {
//     outline: none;
//     border: 1.5px solid #1a73e8;
//   }

//   &:focus ~ label,
//   &:valid ~ label {
//     transform: translateY(-50%) scale(0.8);
//     background-color: #212121;
//     padding: 0 0.2em;
//     color: #2196f3;
//   }
// `;

const ShowPassword = styled.div`
  position: absolute;
  left: 200px;
  top: -40;
  top: 8px;
`;

export const Signup = () => {
  const [username, setUsername] = useState("");
  // // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [switchMode, setSwitchMode] = useState("login");
  const [isPanelActive, setIsPanelActive] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const onToggleClick = () => {
    setErrorMessage("");
    setUsername("");
    setPassword("");
    if (switchMode === "login") {
      setSwitchMode("signup");
      setIsPanelActive(true);
    } else {
      setSwitchMode("login");
      setIsPanelActive(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log('form submitted');
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
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            // dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          setErrorMessage(data.response);
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
    <SectionContainer>
      <div className={`container ${isPanelActive ? "right-panel-active" : ""}`}>
        <div className="signup-container sign-up-container">
          <FormContainer onSubmit={onFormSubmit}>
            <h1>Create account</h1>
            <FormP>
              Welcome! make sure to create an account to be able to se our
              secret
            </FormP>
            <div className="input-container">
              <input
                className="input"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="user-label" htmlFor="username">
                Username
              </label>
            </div>
            {/* <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
            <div className="input-container">
              <input
                className="input"
                id="password"
                type={passwordShown ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="user-label" htmlFor="password">
                Password
              </label>
              <ShowPassword>
                <button onClick={togglePassword}> 👁️ </button>
              </ShowPassword>
            </div>
            <Button type="submit" Mode>
              Submit
            </Button>

            <ErrorMessageContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorMessageContainer>

            {/* <label htmlFor="login">Log in</label>
          <input
            id="login"
            type="radio"
            checked={switchMode === "login"}
            onChange={() => setSwitchMode("login")} 
          /> */}
          </FormContainer>
        </div>
        <div className="signup-container login-container">
          <FormContainer onSubmit={onFormSubmit}>
            <h1>Log in</h1>
            <FormP>some text here</FormP>
            <div className="input-container">
              <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="user-label" htmlFor="username">
                Username
              </label>
            </div>
            {/* <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
            <div className="input-container">
              <input
                className="input"
                type={passwordShown ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="user-label" htmlFor="password">
                Password
              </label>
            </div>
            <Button type="submit" Mode>
              Login
            </Button>
            <ErrorMessageContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorMessageContainer>

            {/* <label htmlFor="signup">Sign up</label>
          <input
            id="signup"
            type="radio"
            checked={switchMode === "signup"}
            onChange={() => setSwitchMode("signup")}
          /> */}
          </FormContainer>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="panel panel-left">
              <h1>Already have a user?</h1>
              <InfoP>Click here to login instead</InfoP>
              <Button onClick={onToggleClick} id="login">
                Login
              </Button>
            </div>
            <div className="panel panel-right">
              <h1>Don't have an account? click on sign up</h1>
              <InfoP>Create account</InfoP>
              <Button onClick={onToggleClick} id="signup">
                signup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
