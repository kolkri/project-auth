import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import visibleEye from "../Assets/visible-eye.png";
import unVisibleEye from "../Assets/unvisible-eye.png";
import { API_URL } from "../utils/urls";
import { user } from "../reducers/user";

import {
  SectionContainer,
  FormContainer,
  Button,
  ButtonMobile,
  MobileContainer,
  FormPMobile,
  FormP,
  InfoP,
  ErrorMessageContainer,
  ErrorMessage,
  ShowPassword,
  EyeButton,
  EyeSymbol,
} from "../styledComponents/styledSignup";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [switchMode, setSwitchMode] = useState("login");
  const [isPanelActive, setIsPanelActive] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    console.log("togglepassword activates");
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
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(switchMode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          setErrorMessage(data.response);
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
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
            <MobileContainer>
              <FormPMobile>Have an account already?</FormPMobile>
              <ButtonMobile
                type="button"
                onClick={onToggleClick}
                id="login"
                Mode
              >
                Login
              </ButtonMobile>
            </MobileContainer>
            <h1>Create account</h1>
            <FormP>Welcome to our page!</FormP>
            <div className="input-container">
              <input
                className="input"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="username">
                Username
              </label>
            </div>
            <div className="input-container">
              <input
                className="input"
                id="password"
                type={!passwordShown ? "password" : "text"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="user-label" htmlFor="password">
                Password
              </label>
              <ShowPassword>
                <EyeButton type="button" onClick={togglePassword}>
                  <EyeSymbol src={passwordShown ? unVisibleEye : visibleEye} />
                </EyeButton>
              </ShowPassword>
            </div>
            <Button type="submit" Mode>
              Submit
            </Button>
            <ErrorMessageContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorMessageContainer>
          </FormContainer>
        </div>
        <div className="signup-container login-container">
          <FormContainer onSubmit={onFormSubmit}>
            <MobileContainer>
              <FormPMobile>Don't have an account?</FormPMobile>
              <ButtonMobile
                type="button"
                onClick={onToggleClick}
                id="signup"
                Mode
              >
                Signup
              </ButtonMobile>
            </MobileContainer>
            <h1>Log in</h1>
            <FormP>Welcome Back!</FormP>
            <div className="input-container">
              <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="username">
                Username
              </label>
            </div>
            <div className="input-container">
              <input
                className="input"
                type={passwordShown ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="user-label" htmlFor="password">
                Password
              </label>
              <ShowPassword>
                <EyeButton type="button" onClick={togglePassword}>
                  <EyeSymbol src={passwordShown ? unVisibleEye : visibleEye} />
                </EyeButton>
              </ShowPassword>
            </div>
            <Button type="submit" Mode>
              Login
            </Button>
            <ErrorMessageContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorMessageContainer>
          </FormContainer>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="panel panel-left">
              <h2>Already have a user?</h2>
              <InfoP>Please go to login instead</InfoP>
              <Button type="button" onClick={onToggleClick} id="login">
                Login
              </Button>
            </div>
            <div className="panel panel-right">
              <h2>Don't have an account?</h2>
              <InfoP>Click on signup to create one</InfoP>
              <Button type="button" onClick={onToggleClick} id="signup">
                signup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
