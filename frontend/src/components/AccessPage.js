import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/urls";
import { user } from "../reducers/user";

import AddButton from "../Assets/add.png";
import { Button } from "../styledComponents/styledSignup";
import {
  Title,
  SubTitle,
  Main,
  Container,
  ImageContainer,
  ImageForm,
  ImageInput,
  ImageFrame,
  Image,
  ImageLabel,
  AddImg,
} from "../styledComponents/styledAccessPage";

export const AccessPage = () => {
  const [secret, setSecret] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.username);
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

  const onProfilePicUpload = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  const showPreview = (event) => {
    event.preventDefault;
    if (event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0]);
      const preview = document.getElementById("profileImagePreview");
      preview.src = src;
      preview.style.display = "block";
    }
  };

  return (
    <Main>
      <Container>
        <Title>Welcome, {name}!</Title>
        <ImageContainer>
          <ImageForm>
            <SubTitle>Add profile image</SubTitle>
            <ImageLabel htmlFor="profileImage">
              <AddImg src={AddButton} />
            </ImageLabel>
            <ImageInput
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={showPreview}
            />
            <ImageFrame>
              <Image id="profileImagePreview" />
            </ImageFrame>
          </ImageForm>
        </ImageContainer>
        <Button onClick={onClickLogout} Mode>
          Logout
        </Button>
      </Container>
    </Main>
  );
};
