import React from "react";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./utils/Themes";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const Container = styled.div`
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
`;

function App() {
  // hooks
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser, role } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        {currentUser && (
          <div>
            {currentUser.username}
            <br />
            {role}
          </div>
        )}
        <SignIn />
      </Container>
    </ThemeProvider>
  );
}

export default App;
