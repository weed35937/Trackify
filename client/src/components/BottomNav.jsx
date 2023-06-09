import {
  ChecklistRounded,
  DashboardRounded,
  PeopleAltRounded
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background: transparent;
  padding: 1px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  @media (min-width: 1100px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinkItem = styled(NavLink)`
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.menu_secondary_text};
  align-items: center;
  gap: 2px;
  cursor: pointer;
  flex-direction: column;
  font-size: 12px;
  padding: 18px 22px;
  &.active {
    color: ${({ theme }) => theme.primary} !important;
  }
`;

const BottomNav = () => {
  const { currentUser, role } = useSelector((state) => state.user);

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
    <Container>
      <Wrapper>
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
      </Wrapper>
    </Container>
  );
};

export default BottomNav;
