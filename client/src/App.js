import { useEffect, useState } from "react";
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
import Menu from "./components/Menu";
import EmployeeRegister from "./components/EmployeeRegister";
import BottomNav from "./components/BottomNav";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

function App() {
  // hooks
  const { currentUser, role, darkMode } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const [menuOpen, setMenuOpen] = useState(true);
  const [openEmployeeRegister, setOpenEmployeeRegister] = useState(false);
  const dispatch = useDispatch();

  // set default dark mode
  useEffect(() => {
    if (darkMode === undefined) {
      dispatch(setDarkMode(true));
    }
  });

  // set the menuOpen state to false if the screen size is less than 768px
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 1110) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        {currentUser ? (
          <BrowserRouter>
            {menuOpen && (
              <Menu
                setMenuOpen={setMenuOpen}
                setOpenEmployeeRegister={setOpenEmployeeRegister}
              />
            )}
            <Wrapper>
              <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
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
                {/* <Route path="*" element={} /> */}
              </Routes>
              {/* <BottomNav /> */}
              {openEmployeeRegister && (
                <EmployeeRegister
                  setOpenEmployeeRegister={setOpenEmployeeRegister}
                />
              )}
            </Wrapper>
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
