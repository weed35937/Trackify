import { useState } from "react";
import styled from "styled-components";
import { Avatar, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import DropdownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import UserProfile from "./Profile";
import Logo from "../Images/Logo.svg";

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media only screen and (max-width: 600px) {
    gap: 8px;
  }
`;

const MenuIcon = styled(IconButton)`
  color: ${({ theme }) => theme.text_primary} !important;
  display: none !important;
  @media (max-width: 1100px) {
    display: flex !important;
  }
`;

const LogoText = styled(Link)`
  @media (max-width: 1100px) {
    display: flex;
    font-size: 20px;
  }
  display: none;
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
  font-size: 24px;
`;

const LogoImg = styled.img`
  display: none;
  height: 22px;
  margin-right: 10px;
  @media (max-width: 1100px) {
    display: block;
  }
`;

const Path = styled.div`
  font-size: 22px;
  font-weight: 600;
  @media (max-width: 1100px) {
    display: none;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  display: flex;
  cursor: pointer;
`;

const UserName = styled.span`
  font-weight: 500;
  margin-right: 10px;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Navbar = ({ setMenuOpen, menuOpen }) => {
  // Hooks
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  // Open the account dialog
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  // get the main path from the location
  let path = location.pathname.split("/")[1];
  if (path === "") path = "Dashboard";
  else if (path === "profile") path = "Profile";
  else if (path === "employees") path = "Employees";
  else if (path === "tasks") path = "Tasks";
  else path = "";

  return (
    <Container>
      <Flex>
        <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
          <MenuRounded sx={{ fontSize: "30px" }} />
        </MenuIcon>
        <Path>{path}</Path>
        <LogoText to="/">
          <LogoImg src={Logo} />
          Trackify
        </LogoText>
      </Flex>
      <User aria-describedby={id} onClick={handleClick}>
        <Avatar
          src={currentUser?.img}
          style={{
            fontSize: "16px",
            background: generateColor(currentUser?.username)
          }}
        >
          {currentUser?.username[0]}
        </Avatar>
        <UserName>{currentUser?.username}</UserName>
        <DropdownIcon />
      </User>
      {currentUser && (
        <UserProfile
          open={open}
          anchorEl={anchorEl}
          id={id}
          handleClose={handleClose}
        />
      )}
    </Container>
  );
};

export default Navbar;
