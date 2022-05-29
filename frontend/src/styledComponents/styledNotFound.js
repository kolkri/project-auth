import styled from "styled-components/macro";

export const Title = styled.h1`
  font-size: 80px;
  color: #fff;
  padding-top: 16px;
`;

export const SubTitle = styled.h2`
  font-size: 20px;
  color: #fff;
  margin-bottom: 8px;
`;

export const Img = styled.img`
  width: 500px;

  @media screen and (max-width: 668px) {
    width: 350px;
  }
`;

export const Container = styled.section`
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
