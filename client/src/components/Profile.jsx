import { Avatar, Popover } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutRounded } from "@mui/icons-material";
import { logout } from "../redux/reducers/userSlice";

const Container = styled.div`
  width: 100%;
  min-width: 300px;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  gap: 10px;
  @media only screen and (max-width: 600px) {
    padding: 18px 20px;
  }
`;

const Details = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const Email = styled.span`
  margin-right: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;
const UserName = styled.span`
  font-weight: 500;
  margin-right: 10px;
  font-size: 22px;
`;

const Role = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  background: ${({ theme }) => theme.primary + 10};
  padding: 4px 12px;
  margin-top: 4px;
`;

const HR = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.text_secondary + 50};
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  margin: 8px 0px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  padding: 6px 12px;
  border-radius: 6px;
  transition: ease-in-out 0.1s;
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    border: 1px solid ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.text_secondary + 10};
  }
`;

const Profile = ({ open, handleClose, anchorEl, id }) => {
  const { currentUser, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Popover
      anchorReference="anchorPosition"
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      anchorPosition={{ top: 80, left: 1800 }}
    >
      <Container>
        <Details>
          <Avatar
            style={{ width: "100px", height: "100px" }}
            src={currentUser?.img}
          />
          <Info>
            <UserName>{currentUser?.username}</UserName>
            <Email>{currentUser?.email}</Email>
            <Role>{role}</Role>
          </Info>
        </Details>
        <HR />
        <LogoutButton onClick={handleLogout}>
          <LogoutRounded />
          <span>Logout</span>
        </LogoutButton>
      </Container>
    </Popover>
  );
};

export default Profile;
