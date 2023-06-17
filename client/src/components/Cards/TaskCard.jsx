/* eslint-disable no-unsafe-optional-chaining */
import {
  AccessTimeOutlined,
  DateRangeOutlined,
  LaptopOutlined,
  RamenDiningOutlined,
  VideocamOutlined
} from "@mui/icons-material";
import moment from "moment";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 4px;
  padding: 14px 16px 18px 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  font-weight: 300;
  ${({ type, theme }) =>
    type === "meeting" &&
    `
  border-left: 0.01px dashed ${theme.meeting + 90};`}
  ${({ type, theme }) =>
    type === "break" &&
    `
  border-left: 0.01px dashed ${theme.break + 90};`}
  ${({ type, theme }) =>
    type === "work" &&
    `
  border-left: 0.01px dashed ${theme.work + 90};`}

  @media (max-width: 1100px) {
    max-width: 350px;
    padding: 16px;
  }
  @media (max-width: 768px) {
    max-width: 94%;
    padding: 16px;
    margin: 0 auto;
  }
  transition: all 0.5s ease-in-out;
  &:hover {
    box-shadow: 0 0 14px rgba(0, 0, 0, 0.4);
    transform: scale(1.02);
  }
`;

const TaskType = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  padding: 3px 8px;
  width: fit-content;
  ${({ type, theme }) =>
    type === "meeting" &&
    `
  background-color: ${theme.meeting + 10};
  color: ${theme.meeting};`}
  ${({ type, theme }) =>
    type === "break" &&
    `
  background-color: ${theme.break + 10};
  color: ${theme.break};`}
  ${({ type, theme }) =>
    type === "work" &&
    `
  background-color: ${theme.work + 10};
  color: ${theme.work};`}
  border-radius: 6px;
`;

const Task = styled.div`
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
  font-weight: 300;
  margin-top: 2px;
  color: ${({ theme }) => theme.text_primary};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Text = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 90};
`;

const TaskCard = ({ task, setOpenUpdateTask }) => {
  const { role } = useSelector((state) => state.user);
  return (
    <Card
      type={task.task_type}
      onClick={() => {
        if (role === "employee") {
          setOpenUpdateTask({
            state: true,
            task
          });
        }
      }}
    >
      <TaskType type={task.task_type}>
        {task.task_type === "meeting" && (
          <VideocamOutlined sx={{ fontSize: "19px" }} />
        )}
        {task.task_type === "break" && (
          <RamenDiningOutlined sx={{ fontSize: "16px" }} />
        )}
        {task.task_type === "work" && (
          <LaptopOutlined sx={{ fontSize: "16px" }} />
        )}
        {task?.task_type?.charAt(0).toUpperCase() + task.task_type.slice(1)}
      </TaskType>
      <Task>{task.task_description}</Task>
      <Flex>
        <Text>
          <AccessTimeOutlined sx={{ fontSize: "20px", color: "inherit" }} />
          {task.time_taken}&nbsp;min
        </Text>
        <Text>
          <DateRangeOutlined sx={{ fontSize: "20px", color: "inherit" }} />
          {moment(task.start_time).format("DD MMM YYYY")}
        </Text>
      </Flex>
    </Card>
  );
};

export default TaskCard;
