import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import DropdownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import UserProfile from "./Profile";
import Logo from "../Images/Logo.svg";

const Container = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 18px 20px;
  }
`;

const LogoText = styled.div`
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
    font-size: 24px;
  }
`;

const LogoImg = styled.img`
  height: 36px;
  margin-right: 10px;
  @media only screen and (max-width: 600px) {
    width: 30px;
    height: 30px;
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

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  // Open the account dialog
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Open the notification dialog
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;
  const notificationClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  return (
    <Container>
      <LogoText>
        <LogoImg src={Logo} />
        Trackify
      </LogoText>
      <User aria-describedby={id} onClick={handleClick}>
        <Avatar src={currentUser?.img} />
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
