import {
  AddRounded,
  CloseRounded,
  DarkModeRounded,
  DashboardRounded,
  LightModeRounded,
  LogoutRounded,
  PeopleAltRounded,
  ChecklistRounded
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { logout, setDarkMode } from "../redux/reducers/userSlice";
import Logo from "../Images/Logo.svg";

const Container = styled.div`
  flex: 0.65;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.menubar};
  color: ${({ theme }) => theme.menu_primary_text};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 300px;
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;
const ContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Space = styled.div`
  height: 50px;
`;
const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px;
`;

const LogoText = styled(Link)`
  font-size: 28px;
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
  @media only screen and (max-width: 600px) {
    font-size: 22px;
  }
`;

const LogoImg = styled.img`
  height: 30px;
  margin-right: 10px;
  @media only screen and (max-width: 600px) {
    height: 22px;
  }
`;

const Close = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;

const NavLinkItem = styled(NavLink)`
  display: flex;
  color: ${({ theme }) => theme.menu_secondary_text};
  align-items: center;
  gap: 16px;
  cursor: pointer;
  font-size: 18px;
  padding: 18px 22px;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  margin: 0px 10px;
  &:hover {
    background-color: ${({ theme }) => theme.menu_secondary_text + 10};
  }
  &.active {
    background-color: ${({ theme }) => theme.primary + 10};
    color: ${({ theme }) => theme.primary} !important;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    font-size: 16px;
  }
`;

const Item = styled.div`
  display: flex;
  color: ${({ theme }) => theme.menu_secondary_text};
  align-items: center;
  gap: 16px;
  cursor: pointer;
  font-size: 18px;
  padding: 20px 22px;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  margin: 0px 10px;
  &:hover {
    background-color: ${({ theme }) => theme.menu_secondary_text + 10};
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    font-size: 16px;
  }
`;

const Hr = styled.div`
  height: 1px;
  margin: 15px 0px 15px 0px;
  background: ${({ theme }) => theme.menu_secondary_text + 30};
`;

const Button = styled.div`
  display: flex;
  color: ${({ theme }) => theme.menu_primary_text};
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  font-size: 16px;
  padding: 18px 22px;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  margin: 0px 10px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.menu_secondary_text + 20};
  &:hover {
    background-color: ${({ theme }) => theme.menu_secondary_text + 30};
  }

  @media (max-width: 768px) {
    padding: 16px 16px;
    font-size: 14px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.menu_primary_text};
  margin-bottom: 12px;
  padding: 2px 26px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Menu = ({ setMenuOpen, setOpenEmployeeRegister, setOpenCreateTask }) => {
  // Hooks
  const { role, darkMode } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Functions
  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  // create a color code based on user name
  const generateColor = (name) => {
    const nameHash = name
      .toLowerCase()
      .split("")
      .reduce((hash, char) => {
        const charCode = char.charCodeAt(0);
        return (((hash % 65536) * 65536) % 2147483648) + charCode;
      }, 0);

    const hue = nameHash % 360;
    const saturation = 75; // Random value between 25 and 100
    const lightness = 40; // Random value between 20 and 80

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <Container setMenuOpen={setMenuOpen}>
      <Flex>
        <LogoText to="/">
          <LogoImg src={Logo} />
          Trackify
        </LogoText>
        <Close>
          <CloseRounded onClick={() => setMenuOpen(false)} />
        </Close>
      </Flex>
      <ContainerWrapper>
        <NavLinkItem
          to="/"
          index
          exact
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <DashboardRounded sx={{ fontSize: "26px" }} />
          Dashboard
        </NavLinkItem>

        {role === "admin" && (
          <NavLinkItem
            to="/employees"
            exact
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <PeopleAltRounded sx={{ fontSize: "26px" }} />
            Employees
          </NavLinkItem>
        )}

        {role === "employee" && (
          <NavLinkItem
            to="/tasks"
            exact
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ChecklistRounded sx={{ fontSize: "26px" }} />
            Tasks
          </NavLinkItem>
        )}
        <NavLinkItem
          to="/profile"
          exact
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Avatar
            style={{
              height: "26px",
              width: "26px",
              fontSize: "12px",
              borderRadius: "6px",
              background: generateColor(currentUser?.username)
            }}
            src={currentUser?.img}
          >
            {currentUser?.username[0]}
          </Avatar>
          Proflie
        </NavLinkItem>
        <Hr />
        {role === "admin" && (
          <Button onClick={() => setOpenEmployeeRegister(true)}>
            <AddRounded sx={{ fontSize: "26px", fontWeight: 600 }} />
            New Employee
          </Button>
        )}
        {role === "employee" && (
          <Button onClick={() => setOpenCreateTask(true)}>
            <AddRounded sx={{ fontSize: "26px", fontWeight: 600 }} />
            New Task
          </Button>
        )}
        <Hr />
        <Title>Settings</Title>
        <Item onClick={() => dispatch(setDarkMode(!darkMode))}>
          {darkMode ? (
            <LightModeRounded sx={{ fontSize: "26px" }} />
          ) : (
            <DarkModeRounded sx={{ fontSize: "26px" }} />
          )}
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        <Item onClick={() => logoutUser()}>
          <LogoutRounded sx={{ fontSize: "26px" }} />
          Logout
        </Item>
        <Space />
      </ContainerWrapper>
    </Container>
  );
};

export default Menu;
