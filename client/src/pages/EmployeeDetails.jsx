/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Avatar } from "@mui/material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getEmployee } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import TaskCard from "../components/Cards/TaskCard";
import PieChart from "../components/Charts/PieChart";
import BarChartComponent from "../components/Charts/BarChart";
import Loader from "../components/Loader";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  padding: 2px 0px 20px 0px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 4px 16px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Error = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 400;
  padding: 4px 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 4px 18px;
  }
`;

const Charts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 16px;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  ${({ direction }) => `
  flex-direction: ${direction};
  `};
  gap: 16px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    gap: 12px;
  }
  ${({ minDirection, minWidth }) => `
  @media (max-width: ${minWidth}) {
  flex-direction: ${minDirection};
  }
  `};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarImg = styled(Avatar)`
  font-size: 50px !important;
  width: 140px !important;
  height: 140px !important;
  @media (max-width: 768px) {
    width: 96px !important;
    height: 96px !important;
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
  padding: 6px 12px;
  border-radius: 5px;
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 40px;
  padding: 26px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 30};
  @media (max-width: 768px) {
    gap: 20px;
    padding: 24px 16px;
  }
`;

const Text = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ExtraDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border-left: 1px solid ${({ theme }) => theme.text_secondary + 30};
  @media (max-width: 768px) {
    border: none;
    gap: 6px;
    padding: 6px 12px;
  }
`;

const EmployeeDetails = () => {
  // Hooks
  const { employeeId } = useParams();
  const { currentUser, reload } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const token = localStorage.getItem("trackify-token");
  const [employee, setEmployee] = useState();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utils
  const today = new Date(); // Get today's date
  const yesterday = new Date(today); // Create a new Date object for yesterday
  yesterday.setDate(today.getDate() - 1);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        await getEmployee(employeeId, token).then((res) => {
          setEmployee(res.data.employee);
          setTasks(res.data.employee.tasks);
          setLoading(false);
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err.response) {
          setLoading(false);
          setError(err.response.data.message);
        } else {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error"
            })
          );
        }
      }
    };
    fetchEmployees();
  }, [token, currentUser, dispatch, reload, employeeId]);

  const userRole =
    // eslint-disable-next-line no-unsafe-optional-chaining
    employee?.role.charAt(0).toUpperCase() + employee?.role.slice(1);

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
      {loading || error ? (
        <>
          {loading && <Loader />}
          {error && <Error style={{ color: "red" }}>Error: {error}</Error>}
        </>
      ) : (
        <div>
          <Wrapper>
            <Content>
              <ProfileSection>
                <FlexWrap style={{ gap: "20px" }}>
                  <AvatarImg
                    style={{
                      background: generateColor(employee?.username)
                    }}
                    src={employee?.img}
                  >
                    {employee?.username[0]}
                  </AvatarImg>
                  <ProfileInfo>
                    <ProfileInfoName>{employee?.username}</ProfileInfoName>
                    <Desc style={{ color: "#3483eb" }}>{employee?.email}</Desc>
                    <Tags>
                      <Tag>{userRole}</Tag>
                      {employee.active ? (
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
                  <ExtraDetails>
                    <Text>
                      <b>Contact No: &nbsp;</b>
                      {` ${employee.contact_number}`}
                    </Text>
                    <Text>
                      <b>Department: &nbsp;</b>
                      {` ${employee.department}`}
                    </Text>
                    <Text>
                      <b>Joining Date: &nbsp;</b>
                      {` ${moment(employee.joining_date).format("DD-MM-YYYY")}`}
                    </Text>
                  </ExtraDetails>
                </FlexWrap>
              </ProfileSection>
              <FlexWrap minDirection="column" minWidth="1200px">
                <FlexWrap
                  direction="column"
                  style={{ flex: "8", flexWrap: "nowrap", width: "100%" }}
                >
                  <div style={{ height: "100%" }}>
                    <ItemTitle>Todays Tasks</ItemTitle>
                    {tasks
                      .filter((task) => {
                        const taskStartDate = new Date(task.start_time);
                        return (
                          taskStartDate.getDate() === today.getDate() &&
                          taskStartDate.getMonth() === today.getMonth() &&
                          taskStartDate.getFullYear() === today.getFullYear()
                        );
                      })
                      .sort(
                        (a, b) =>
                          new Date(b.start_time) - new Date(a.start_time)
                      ).length === 0 ? (
                      // eslint-disable-next-line react/jsx-indent
                      <Error>No tasks found !! </Error>
                    ) : (
                      <ResponsiveMasonry
                        columnsCountBreakPoints={{
                          400: 1,
                          700: 2,
                          1000: 3
                        }}
                        style={{ marginBottom: "32px" }}
                      >
                        <Masonry gutter="12px">
                          {tasks
                            .filter((task) => {
                              const taskStartDate = new Date(task.start_time);
                              return (
                                taskStartDate.getDate() === today.getDate() &&
                                taskStartDate.getMonth() === today.getMonth() &&
                                taskStartDate.getFullYear() ===
                                  today.getFullYear()
                              );
                            })
                            .sort(
                              (a, b) =>
                                new Date(b.start_time) - new Date(a.start_time)
                            )
                            .map((task) => (
                              <TaskCard key={task._id} task={task} />
                            ))}
                        </Masonry>
                      </ResponsiveMasonry>
                    )}
                  </div>

                  <div style={{ height: "100%" }}>
                    <ItemTitle>Recent Tasks</ItemTitle>

                    {tasks
                      .slice(0, 9)
                      .sort(
                        (a, b) =>
                          new Date(b.start_time) - new Date(a.start_time)
                      ).length === 0 ? (
                      // eslint-disable-next-line react/jsx-indent
                      <Error>No tasks found !! </Error>
                    ) : (
                      <ResponsiveMasonry
                        columnsCountBreakPoints={{
                          400: 1,
                          700: 2,
                          1000: 3
                        }}
                        style={{ marginBottom: "32px" }}
                      >
                        <Masonry gutter="12px">
                          {tasks
                            .slice(0, 9)
                            .sort(
                              (a, b) =>
                                new Date(b.start_time) - new Date(a.start_time)
                            )
                            .map((task) => (
                              <TaskCard key={task._id} task={task} />
                            ))}
                        </Masonry>
                      </ResponsiveMasonry>
                    )}
                  </div>
                </FlexWrap>
                <FlexWrap
                  direction="column"
                  style={{ flex: "2", flexWrap: "wrap" }}
                >
                  <div>
                    <ItemTitle>Pie Chart</ItemTitle>
                    <Charts>
                      <PieChart showType="today" tasks={tasks} />
                      <PieChart showType="yesterday" tasks={tasks} />
                    </Charts>
                  </div>
                </FlexWrap>
              </FlexWrap>
              <div>
                <ItemTitle>Weekly Chart</ItemTitle>
                <Charts>
                  <BarChartComponent tasks={tasks} />
                </Charts>
              </div>
            </Content>
          </Wrapper>
        </div>
      )}
    </Container>
  );
};

export default EmployeeDetails;
