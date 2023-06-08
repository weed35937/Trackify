import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Themes";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Authentication from "./pages/Authentication";
import Navbar from "./components/Navbar";
import ToastMessage from "./components/ToastMessage";
import { setDarkMode } from "./redux/reducers/userSlice";

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
  const { currentUser, role, darkMode } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  // set default dark mode
  useEffect(() => {
    if (darkMode === undefined) {
      dispatch(setDarkMode(true));
    }
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        {currentUser ? (
          <BrowserRouter>
            <Navbar />
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
        {open && (
          <ToastMessage open={open} message={message} severity={severity} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
