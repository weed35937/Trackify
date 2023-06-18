/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../Images/Logo.svg";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #15171e;
`;

const LogoText = styled.div`
  display: flex;
  font-weight: bold;
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
  font-size: 38px;
  gap: 12px;
`;

const LogoImg = styled.img`
  height: 40px;
`;
const withSplashScreen = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setShowSplash(false);
      }, 2000); // Set a timeout for the splash screen (e.g., 3 seconds)

      return () => clearTimeout(timeout); // Clear the timeout when the component unmounts
    }, []);

    return showSplash ? (
      <Container>
        <LogoText>
          <LogoImg src={Logo} />
          Trackify
        </LogoText>
      </Container>
    ) : (
      <WrappedComponent {...props} />
    );
  };
};

export default withSplashScreen;
