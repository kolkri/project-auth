import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/urls";
import { user } from "../reducers/user";

export const AccessPage = () => {
  const [secret, setSecret] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    dispatch(user.actions.setDeleteAccessToken(null));
    //dispatch(user.actions.setDeleteAccessToken())
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signup");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("loginpage"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSecret(data.response);
        }
      });
  }, [accessToken]);

  return (
    <>
      <h1>{secret}</h1>
      <button onClick={onClickLogout}>Log out</button>
    </>
  );
};
