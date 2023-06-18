/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getAllTasks } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import TaskCard from "../components/Cards/TaskCard";
import UpdateTask from "../components/UpdateTask";
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
  gap: 8px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  padding: 8px 12px;
  @media (max-width: 768px) {
    padding: 4px 6px;
    font-size: 12px;
    gap: 6px;
  }
`;

const FilterText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 400px) {
    font-size: 8px;
  }
`;

const FilterSelect = styled.select`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  background-color: transparent;
  border: none;
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 400px) {
    font-size: 8px;
  }
`;

const FilterOption = styled.option`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  background-color: ${({ theme }) => theme.card};
  @media (max-width: 768px) {
    font-size: 12px;
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

const Tasks = ({ setOpenCreateTask }) => {
  // Hooks
  const { currentUser, reload } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const token = localStorage.getItem("trackify-token");
  const [tasks, setTasks] = useState([]);
  const [openUpdateTask, setOpenUpdateTask] = useState({
    state: false,
    task: null
  });
  const [filter, setFilter] = useState([]);
  const [customDate, setCustomDate] = useState(null); // [startDate, endDate
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

  // Filter
  const handlefilter = (e) => {
    if (e.target.value === "All") {
      setFilter([]);
      setCustomDate(null);
    } else if (e.target.value === "Last 7 Days") {
      setFilter([
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
      ]);
      setCustomDate(null);
    } else if (e.target.value === "This Week") {
      setFilter([
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay()
        ),
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay() + 6
        )
      ]);
      setCustomDate(null);
    } else if (e.target.value === "This Month") {
      setFilter([
        new Date(today.getFullYear(), today.getMonth(), 1),
        new Date(today.getFullYear(), today.getMonth() + 1, 0)
      ]);
      setCustomDate(null);
    } else if (e.target.value === "This Year") {
      setFilter([
        new Date(today.getFullYear(), 0, 1),
        new Date(today.getFullYear(), 11, 31)
      ]);
      setCustomDate(null);
    } else if (e.target.value === "Custom") {
      setCustomDate(new Date());
      setFilter([]);
    }
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
                            taskStartDate.getFullYear() === today.getFullYear()
                          );
                        })
                        .sort(
                          (a, b) =>
                            new Date(b.start_time) - new Date(a.start_time)
                        )
                        .map((task) => (
                          <TaskCard
                            key={task._id}
                            task={task}
                            setOpenUpdateTask={setOpenUpdateTask}
                          />
                        ))
                    )}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
              <div>
                <ItemTitle>Yesterdays Tasks</ItemTitle>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 400: 1, 750: 2, 900: 4 }}
                  style={{ marginBottom: "32px" }}
                >
                  <Masonry gutter="12px">
                    {tasks
                      .filter((task) => {
                        const taskStartDate = new Date(task.start_time);
                        return (
                          taskStartDate.getDate() === yesterday.getDate() &&
                          taskStartDate.getMonth() === yesterday.getMonth() &&
                          taskStartDate.getFullYear() ===
                            yesterday.getFullYear()
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
                            taskStartDate.getDate() === yesterday.getDate() &&
                            taskStartDate.getMonth() === yesterday.getMonth() &&
                            taskStartDate.getFullYear() ===
                              yesterday.getFullYear()
                          );
                        })
                        .sort(
                          (a, b) =>
                            new Date(b.start_time) - new Date(a.start_time)
                        )
                        .map((task) => (
                          <TaskCard
                            key={task._id}
                            task={task}
                            setOpenUpdateTask={setOpenUpdateTask}
                          />
                        ))
                    )}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
              <div>
                <ItemTitle>
                  {filter.length === 2 || customDate ? "Custom" : "All"} Tasks
                  <Filter>
                    <FilterText>Filter Tasks:</FilterText>
                    <FilterSelect onChange={(e) => handlefilter(e)}>
                      <FilterOption value="All">All</FilterOption>
                      <FilterOption value="Last 7 Days">
                        Last 7 Days
                      </FilterOption>
                      <FilterOption value="This Week">This Week</FilterOption>
                      <FilterOption value="This Month">This Month</FilterOption>
                      <FilterOption value="This Year">This Year</FilterOption>
                      <FilterOption value="Custom">Custom -</FilterOption>
                    </FilterSelect>
                    {customDate && (
                      <div
                        style={{
                          width: "90px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: `${theme.card}`,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          cursor: "pointer"
                        }}
                      >
                        <DatePicker
                          selected={customDate}
                          onChange={(date) => {
                            setCustomDate(date);
                          }}
                          onFocus={(e) => {
                            e.target.readOnly = true;
                          }}
                          onBlur={(e) => {
                            e.target.readOnly = false;
                          }}
                          placeholderText="Start Date"
                          maxDate={new Date()}
                          dateFormat="dd MMM yyyy"
                          showYearDropdown
                          scrollableYearDropdown
                        />
                      </div>
                    )}
                  </Filter>
                </ItemTitle>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 400: 1, 750: 2, 900: 4 }}
                >
                  <Masonry gutter="12px">
                    {tasks.filter((task) => {
                      if (filter.length === 0) {
                        if (customDate) {
                          // show tasks for current date only
                          const cuDate = new Date(customDate);
                          const taskDate = new Date(task.start_time);
                          return (
                            taskDate.getDate() === cuDate.getDate() &&
                            taskDate.getMonth() === cuDate.getMonth() &&
                            taskDate.getFullYear() === cuDate.getFullYear()
                          );
                        }
                        // Show all tasks if no filter is applied
                        return task.start_time;
                        // eslint-disable-next-line no-else-return
                      } else if (
                        filter.length === 2 &&
                        filter[0] &&
                        filter[1]
                      ) {
                        // Check if task's start_time falls within the filter range
                        const taskStartTime = new Date(task.start_time);
                        return (
                          taskStartTime >= filter[0] &&
                          taskStartTime <= filter[1]
                        );
                      }
                      return false;
                    }).length === 0 ? (
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
                          if (filter.length === 0) {
                            if (customDate) {
                              // show tasks for current date only
                              const cuDate = new Date(customDate);
                              const taskDate = new Date(task.start_time);
                              return (
                                taskDate.getDate() === cuDate.getDate() &&
                                taskDate.getMonth() === cuDate.getMonth() &&
                                taskDate.getFullYear() === cuDate.getFullYear()
                              );
                            }
                            // Show all tasks if no filter is applied
                            return task.start_time;
                            // eslint-disable-next-line no-else-return
                          } else if (
                            filter.length === 2 &&
                            filter[0] &&
                            filter[1]
                          ) {
                            // Check if task's start_time falls within the filter range
                            const taskStartTime = new Date(task.start_time);
                            return (
                              taskStartTime >= filter[0] &&
                              taskStartTime <= filter[1]
                            );
                          }
                          return false;
                        })
                        .sort(
                          (a, b) =>
                            new Date(b.start_time) - new Date(a.start_time)
                        )
                        .map((task) => (
                          <TaskCard
                            key={task._id}
                            task={task}
                            setOpenUpdateTask={setOpenUpdateTask}
                          />
                        ))
                    )}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            </Content>
          </Wrapper>
        </div>
      )}

      {openUpdateTask.state && (
        <UpdateTask
          setOpenUpdateTask={setOpenUpdateTask}
          task={openUpdateTask.task}
        />
      )}
    </Container>
  );
};

export default Tasks;
