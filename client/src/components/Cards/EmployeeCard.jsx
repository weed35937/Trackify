import { Avatar } from "@mui/material";
import styled, { useTheme } from "styled-components";
import {
  BusinessRounded,
  CallRounded,
  DateRangeRounded
} from "@mui/icons-material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 18px 12px;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.02);
  }
  @media (max-width: 768px) {
    max-width: 300px;
  }
  @media (max-width: 600px) {
    max-width: 400px;
  }
  @media (max-width: 500px) {
    max-width: 94%;
  }
`;

const AvatarImg = styled(Avatar)`
  width: 80px !important;
  height: 80px !important;
  font-size: 32px !important;
  @media (max-width: 768px) {
    width: 60px !important;
    height: 60px !important;
    font-size: 24px !important;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  background: ${({ theme }) => theme.bg};
  padding: 12px;
  border-radius: 8px;
  width: 100%;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Status = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.green + 10};
  color: ${({ theme }) => theme.green};
  font-size: 12px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const EmployeeCard = ({ employee }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // generate color for avatar
  const generateColor = (name) => {
    const nameHash = name
      ?.toLowerCase()
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
    // eslint-disable-next-line no-underscore-dangle
    <Card onClick={() => navigate(`/employee/${employee._id}`)}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          width: "100%"
        }}
      >
        <AvatarImg
          style={{
            background: generateColor(employee?.username)
          }}
        >
          {employee?.username[0]}
        </AvatarImg>
        <Info>
          <Text style={{ fontSize: "20px", fontWeight: "500" }}>
            {employee.username}
          </Text>
          <Text style={{ color: "#3483eb" }}>{employee.email}</Text>
        </Info>
      </div>

      <Details>
        <Info style={{ gap: "2px" }}>
          <Text>
            <CallRounded style={{ fontSize: "inherit" }} />
            {employee.contact_number}
          </Text>
          <Text>
            <BusinessRounded style={{ fontSize: "inherit" }} />
            {employee.department}
          </Text>
          <Text>
            <DateRangeRounded style={{ fontSize: "inherit" }} />
            {moment(employee.date_of_joining).format("DD MMM YYYY")}
          </Text>
        </Info>
        <Info>
          {employee?.active ? (
            <Status
              style={{
                background: `${theme.green + 10}`,
                color: `${theme.green}`
              }}
            >
              Active
            </Status>
          ) : (
            <Status
              style={{
                background: `${theme.yellow + 10}`,
                color: `${theme.yellow}`
              }}
            >
              Deactivated
            </Status>
          )}
        </Info>
      </Details>
    </Card>
  );
};

export default EmployeeCard;
