import styled from "styled-components/macro";

export const Title = styled.h1`
  font-size: 28px;
`;

export const SubTitle = styled.h2`
  color: #8e8e8e;
  font-size: 16px;
  text-transform: uppercase;
`;

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 300px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10%;
`;

export const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageForm = styled.div`
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImageFrame = styled.div`
  display: flex;
  justify-content: center;
`;

export const Image = styled.img`
  width: 130px;
  height: 130px;
  margin-top: 10px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 1px #a7a7a7;
`;

export const ImageLabel = styled.label`
  width: 50px;
  border: none;
`;

export const AddImg = styled.img`
  width: 50px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 80ms ease-in;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(0.95);
  }
  .ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
`;
