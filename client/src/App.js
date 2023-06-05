import React from "react";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Themes";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Authentication from "./pages/Authentication";

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
        {currentUser ? (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />
                }
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <Authentication />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
