/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getAllTasks } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import TaskCard from "../components/Cards/TaskCard";

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

const TextButton = styled.div`
  font-size: 14px;
  font-weight: 400;
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0px 16px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
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
const EmployeeDashboard = ({ setOpenCreateTask }) => {
  // Hooks
  const { currentUser, reload } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("trackify-token");
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
        await getAllTasks(token).then((res) => {
          setTasks(res.data.tasks);
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
  }, [token, currentUser, dispatch, reload]);
  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {error ? (
            <Error style={{ color: "red" }}>{error}</Error>
          ) : (
            <Wrapper>
              <Content>
                <div>
                  <ItemTitle>Todays Tasks</ItemTitle>
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 400: 1, 750: 2, 900: 4 }}
                    style={{ marginBottom: "32px" }}
                  >
                    <Masonry gutter="12px">
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
                        <Error>
                          No tasks found !!{" "}
                          <TextButton
                            style={{ fontSize: "16px" }}
                            onClick={() => setOpenCreateTask(true)}
                          >
                            Add Task
                          </TextButton>
                        </Error>
                      ) : (
                        tasks
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
                          ))
                      )}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
                <div>
                  <ItemTitle>
                    Recent Tasks
                    <TextButton onClick={() => navigate("/tasks")}>
                      View All
                    </TextButton>
                  </ItemTitle>
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 400: 1, 750: 2, 900: 4 }}
                    style={{ marginBottom: "32px" }}
                  >
                    <Masonry gutter="12px">
                      {tasks
                        .slice(0, 8)
                        .sort(
                          (a, b) =>
                            new Date(b.start_time) - new Date(a.start_time)
                        ).length === 0 ? (
                        // eslint-disable-next-line react/jsx-indent
                        <Error>
                          No tasks found !!{" "}
                          <TextButton
                            style={{ fontSize: "16px" }}
                            onClick={() => setOpenCreateTask(true)}
                          >
                            Add Task
                          </TextButton>
                        </Error>
                      ) : (
                        tasks
                          .slice(0, 8)
                          .sort(
                            (a, b) =>
                              new Date(b.start_time) - new Date(a.start_time)
                          )
                          .map((task) => (
                            <TaskCard key={task._id} task={task} />
                          ))
                      )}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
              </Content>
            </Wrapper>
          )}
        </div>
      )}
    </Container>
  );
};

export default EmployeeDashboard;
