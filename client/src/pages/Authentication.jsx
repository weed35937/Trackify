import { useState } from "react";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Logo from "../Images/Logo.svg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    padding: 24px 12px;
    justify-content: start;
  }
`;

const Logotext = styled.div`
  font-size: 38px;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  background: linear-gradient(
    225deg,
    rgb(132, 0, 255) 0%,
    rgb(230, 0, 255) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-bottom: 4px;
  @media only screen and (max-width: 600px) {
    font-size: 34px;
  }
`;

const LogoImg = styled.img`
  height: 36px;
  margin-right: 10px;
  @media only screen and (max-width: 600px) {
    height: 30px;
  }
`;

const WelcomeText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 36px;
  color: ${({ theme }) => theme.text_primary + 80};
  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const Authentication = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  return (
    <Container>
      <Logotext>
        <LogoImg src={Logo} />
        Trackify
      </Logotext>
      <WelcomeText>
        {openSignUp ? "Welcome to Trackify!" : "Welcome back to Trackify!"}
      </WelcomeText>
      {openSignUp ? (
        <SignUp setOpenSignUp={setOpenSignUp} />
      ) : (
        <SignIn setOpenSignUp={setOpenSignUp} />
      )}
    </Container>
  );
};

export default Authentication;
