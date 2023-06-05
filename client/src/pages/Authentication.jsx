import React, { useState } from "react";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Authentication = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  return (
    <Container>
      {openSignUp ? (
        <SignUp setOpenSignUp={setOpenSignUp} />
      ) : (
        <SignIn setOpenSignUp={setOpenSignUp} />
      )}
    </Container>
  );
};

export default Authentication;
