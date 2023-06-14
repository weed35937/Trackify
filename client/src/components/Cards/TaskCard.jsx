import { AccessTimeOutlined, DateRangeOutlined } from "@mui/icons-material";
import moment from "moment";
import styled, { useTheme } from "styled-components";

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  padding: 18px 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
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
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 16px;
  }
`;

const TaskType = styled.div`
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
  font-weight: 400;
  margin-top: 2px;
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
`;

const TaskCard = ({ task }) => {
  const theme = useTheme();
  return (
    <Card type={task.task_type}>
      <TaskType type={task.task_type}>
        {task.task_type.charAt(0).toUpperCase() + task.task_type.slice(1)}
      </TaskType>
      <Task>{task.task_description}</Task>
      <Flex>
        <Text style={{ color: theme.text_secondary }}>
          <AccessTimeOutlined sx={{ fontSize: "20px" }} />
          {task.time_taken}&nbsp;min
        </Text>
        <Text style={{ color: theme.text_secondary }}>
          <DateRangeOutlined sx={{ fontSize: "20px" }} />
          {moment(task.start_date).format("DD-MMM-YYYY")}
        </Text>
      </Flex>
    </Card>
  );
};

export default TaskCard;
