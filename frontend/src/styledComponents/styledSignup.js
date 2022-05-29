import React from "react";
import styled from "styled-components/macro";

export const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: -20px 0 50px;
`;

export const FormContainer = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Button = styled.button`
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

  &:focus {
    outline: none;
  }

  .ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
`;

export const MobileContainer = styled.div`
  display: none;  
  @media (max-width: 768px) {
    display: flex;
    width:100%;
    justify-content: center;
    align-items: center;
    margin: 20px;
  }
`

export const ButtonMobile = styled.button`
  display: none;
  cursor: pointer;
  color: #1a73e8;
  font-size: 12px;
  border:none;
  background-color:#fff;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const FormP = styled.p`
  color: #a7a7a7;
  margin: 16px 0;
`;

export const InfoP = styled.p`
  color: #fff;
  margin: 16px 0;
`;

export const ErrorMessageContainer = styled.div`
  position: absolute;
  bottom: 40px;
  padding: 20px;
`;

export const ErrorMessage = styled.p`
  color: red;
  align-self: flex-end;
`;

export const ShowPassword = styled.div`
  position: absolute;
  left: 200px;
  top: -40;
  top: 8px;
`;

export const EyeButton = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

export const EyeSymbol = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: -5px;
  left: 1px;

  &:active,
  &:hover {
    opacity: 0.5;
  }
`;
