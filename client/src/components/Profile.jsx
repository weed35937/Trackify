import { Avatar, Popover } from "@mui/material";
import React from "react";
import styled, { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { LogoutRounded } from "@mui/icons-material";
import { logout } from "../redux/reducers/userSlice";

const Container = styled.div`
  width: 100%;
  min-width: 320px;
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
  width: 100%;
  padding: 0px 12px 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 12px;
`;

const Role = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  background: ${({ theme }) => theme.primary + 10};
  padding: 2px 8px;
  margin-bottom: 4px;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-top: -60px;
  gap: 2px;
  border-radius: 8px;
  background: ${({ theme }) => theme.text_secondary + 10};
  padding: 26px 12px 12px 12px;
`;

const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
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
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const userRole = role.charAt(0).toUpperCase() + role.slice(1);

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
            style={{
              width: "100px",
              height: "100px",
              margin: "0px 10px 0px 0px",
              border: `6px solid ${theme.bgLight}`
            }}
            src={currentUser?.img}
          />
          <Info>
            <Role>{userRole}</Role>
            <Text>
              <b>Name: &nbsp;</b>
              {` ${currentUser.username}`}
            </Text>{" "}
            <Text>
              <b>Email: &nbsp;</b>
              <span style={{ color: "#3483eb" }}>
                {` ${currentUser.email}`}
              </span>
            </Text>
            {role === "employee" && (
              <>
                <Text>
                  <b>Contact No: &nbsp;</b>
                  {` ${currentUser.contact_number}`}
                </Text>
                <Text>
                  <b>Department: &nbsp;</b>
                  {` ${currentUser.department}`}
                </Text>
                <Text>
                  <b>Joining Date: &nbsp;</b>
                  {` ${moment(currentUser.joining_date).format("DD-MM-YYYY")}`}
                </Text>
              </>
            )}
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
