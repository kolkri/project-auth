import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/urls";
import { user } from "../reducers/user";
import styled from 'styled-components'

const Title = styled.h1`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
`

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 300px;
  height: 400px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LogOutButton = styled.button`
  width: fit-content;
`
const ImageContainer = styled.div`
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`

const ImageForm = styled.div`
  width:250px;
  padding:20px;
  background:#fff;
  border:2px dashed #555;
`

const ImageInput = styled.input`
  display:none; 
`

const ImageLabel = styled.label`
  display:block;
  width:100%;
  height:50px;
  line-height:50px;
  text-align:center;
  background:#333;
  color:#fff;
  font-size:15px;
  font-family:"Open Sans",sans-serif;
  text-transform:Uppercase;
  font-weight:600;
  border-radius:10px;
  cursor:pointer;
`

const Image = styled.img`
  width:100%;
  display:none;
  margin-top:10px;
`
export const AccessPage = () => {
  const [secret, setSecret] = useState("");
  const [profileImg, setProfileImg] = useState(null)

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

  const onProfilePicUpload = (event) => {
    event.preventDefault()
    console.log(event.target)
  }

const showPreview = (event) => {
    event.preventDefault
    if(event.target.files.length > 0){
      const src = URL.createObjectURL(event.target.files[0]);
      const preview = document.getElementById("profileImagePreview");
      preview.src = src;
      preview.style.display = "block";
    }
  }

  return (
    <Main>
      <Container>
        <Title>{secret}</Title>
        <ImageContainer>
          <ImageForm>
            <ImageLabel htmlFor="profileImage">Upload your profile image</ImageLabel>
            <ImageInput type="file" id="profileImage" accept="image/*" onChange={showPreview} />
            <div>
              <Image id="profileImagePreview" />
            </div>
          </ImageForm>
        </ImageContainer>
        <LogOutButton onClick={onClickLogout}>Log out</LogOutButton>
      </Container>
    </Main>
  );
};
