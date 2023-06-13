import { Avatar, Popover } from "@mui/material";
import styled, { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  DarkModeRounded,
  LightModeRounded,
  LogoutRounded
} from "@mui/icons-material";
import { logout, setDarkMode } from "../redux/reducers/userSlice";

const Container = styled.div`
  width: 100%;
  min-width: 320px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border: 0.5px solid ${({ theme }) => theme.text_secondary + 20};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0px;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.9);
  gap: 10px;
  @media only screen and (max-width: 600px) {
    padding: 12px 0px;
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

const Tags = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const Tag = styled.span`
  padding: 6px 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
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

const Flex = styled.div`
  width: 100%;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Button = styled.div`
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
  transition: ease-in-out 0.2s;
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    border: 1px solid ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.text_secondary + 10};
  }
  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const TextButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 10px 0px 0px 0px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 12px;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`;

const Profile = ({ open, handleClose, anchorEl }) => {
  // Hooks
  const { currentUser, role, darkMode } = useSelector((state) => state.user);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Functions
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const userRole = role.charAt(0).toUpperCase() + role.slice(1);

  // generate color for avatar
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
    <Popover
      anchorReference="anchorPosition"
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      PaperProps={{
        style: {
          borderRadius: 8 // Adjust the value as per your desired border radius
        }
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
              border: `6px solid ${theme.card}`,
              fontSize: "36px",
              background: generateColor(currentUser?.username)
            }}
            src={currentUser?.img}
          >
            {currentUser?.username[0]}
          </Avatar>
          <Info>
            <Tags>
              <Tag>{userRole}</Tag>
              {currentUser.active ? (
                <Tag
                  style={{
                    background: `${theme.green + 20}`,
                    color: `${theme.green}`
                  }}
                >
                  Active
                </Tag>
              ) : (
                <Tag
                  style={{
                    background: `${theme.yellow + 20}`,
                    color: `${theme.yellow}`
                  }}
                >
                  Deactivated
                </Tag>
              )}
            </Tags>
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
            <HR style={{ marginTop: "12px" }} />
            <TextButton onClick={() => navigate("/profile")}>
              View Profile
            </TextButton>
          </Info>
        </Details>
        <HR />
        <Flex>
          <Button onClick={() => dispatch(setDarkMode(!darkMode))}>
            {!darkMode ? (
              <>
                <DarkModeRounded />
                Dark Mode
              </>
            ) : (
              <>
                <LightModeRounded />
                Light Mode
              </>
            )}
          </Button>
          <Button onClick={handleLogout}>
            <LogoutRounded />
            <span>Logout</span>
          </Button>
        </Flex>
      </Container>
    </Popover>
  );
};

export default Profile;
