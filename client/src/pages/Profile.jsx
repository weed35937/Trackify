import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import styled, { useTheme } from "styled-components";
import {
  BusinessRounded,
  DateRangeRounded,
  EmailRounded,
  PasswordRounded,
  PersonRounded,
  PhoneRounded
} from "@mui/icons-material";
import moment from "moment";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
  background: ${({ theme }) => theme.background};
`;

const ProfileSection = styled.div`
  display: flex;
  width: 100%;
  max-width: 650px;
  flex-direction: column;
  gap: 40px;
  background: ${({ theme }) => theme.card};
  padding: 26px 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    gap: 30px;
    padding: 24px 16px;
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 768px) {
    gap: 12px;
  }
  align-items: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarImg = styled(Avatar)`
  font-size: 50px !important;
  width: 130px !important;
  height: 130px !important;
  @media (max-width: 768px) {
    width: 80px !important;
    height: 80px !important;
    fornt-size: 12px !important;
  }
`;

const ProfileInfoName = styled.span`
  font-size: 26px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Desc = styled.span`
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const Tag = styled.span`
  padding: 8px 12px;
  border-radius: 5px;
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const UpdateSection = styled.div`
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const UpdateTitle = styled.span`
  font-size: 22px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const Fileds = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const InputFIleds = styled.div`
  padding: 14px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: not-allowed;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.text_primary + 60};
  background: ${({ theme }) => theme.text_primary + 10};
  color: ${({ theme }) => theme.text_primary + 99};
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const InputFLex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const TextButton = styled.div`
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0px;
  text-align: right;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 14px;
  border-radius: 6px;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const Profile = ({ setOpenUpdateDetails, setOpenChangePassword }) => {
  const { currentUser, role } = useSelector((state) => state.user);
  const theme = useTheme();

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
    <Container>
      <ProfileSection>
        <Flex>
          <AvatarImg
            style={{
              background: generateColor(currentUser?.username)
            }}
            src={currentUser?.img}
          >
            {currentUser?.username[0]}
          </AvatarImg>
          <ProfileInfo>
            <ProfileInfoName>{currentUser?.username}</ProfileInfoName>
            <Desc style={{ color: "#3483eb" }}>{currentUser?.email}</Desc>
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
          </ProfileInfo>
        </Flex>
      </ProfileSection>
      <UpdateSection>
        <UpdateTitle>Update Your Account</UpdateTitle>
        <UpdateForm>
          <Fileds>
            <Label>Username</Label>
            <InputFIleds>
              <PersonRounded />
              {currentUser?.username}
            </InputFIleds>
          </Fileds>
          <Fileds>
            <Label>Email</Label>
            <InputFIleds>
              <EmailRounded />
              {currentUser?.email}
            </InputFIleds>
          </Fileds>
          {role === "employee" && (
            <>
              <Fileds>
                <Label>Contact Number</Label>
                <InputFIleds>
                  <PhoneRounded />
                  {currentUser?.contact_number}
                </InputFIleds>
              </Fileds>
              <InputFLex>
                <Fileds>
                  <Label>Department</Label>
                  <InputFIleds>
                    <BusinessRounded />
                    {currentUser?.department}
                  </InputFIleds>
                </Fileds>
                <Fileds>
                  <Label>Joining Date</Label>
                  <InputFIleds>
                    <DateRangeRounded />
                    {` ${moment(currentUser.joining_date).format(
                      "DD-MM-YYYY"
                    )}`}
                  </InputFIleds>
                </Fileds>
              </InputFLex>
            </>
          )}

          <Fileds>
            <Label>Password</Label>
            <InputFIleds
              style={{
                type: "password"
              }}
            >
              <PasswordRounded />
              <input
                type="password"
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "inherit",
                  fontSize: "inherit",
                  height: "100%",
                  width: "50%",
                  cursor: "not-allowed"
                }}
                value="124359809"
              />
              <TextButton onClick={() => setOpenChangePassword(true)}>
                Change Password ?
              </TextButton>
            </InputFIleds>
          </Fileds>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpenUpdateDetails(true);
            }}
            style={{ marginTop: "12px" }}
          >
            Update Details
          </Button>
        </UpdateForm>
      </UpdateSection>
    </Container>
  );
};

export default Profile;
