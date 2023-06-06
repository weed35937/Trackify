import React from "react";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { darkTheme, lightTheme } from "./utils/Themes";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Authentication from "./pages/Authentication";
import Navbar from "./components/Navbar";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
`;

function App() {
  // hooks
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser, role } = useSelector((state) => state.user);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Container>
            {currentUser ? (
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={
                      role === "admin" ? (
                        <AdminDashboard />
                      ) : (
                        <EmployeeDashboard />
                      )
                    }
                  />
                </Routes>
              </BrowserRouter>
            ) : (
              <Authentication />
            )}
          </Container>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
