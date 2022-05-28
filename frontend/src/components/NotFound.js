import React from "react";
import { Link } from "react-router-dom";

import ErrorImg from "../Assets/404-page.png";
import { Button } from "../styledComponents/styledSignup";
import { Main } from "styledComponents/styledAccessPage";
import {
  Container,
  Title,
  SubTitle,
  Img,
} from "../styledComponents/styledNotFound";

export const NotFound = () => {
  return (
    <Main>
      <Container>
        <Title>404</Title>
        <SubTitle>This page is taking a nap!</SubTitle>
        <Link to="/">
          <Button>Go back to start</Button>
        </Link>
        <Img src={ErrorImg} />
      </Container>
    </Main>
  );
};
