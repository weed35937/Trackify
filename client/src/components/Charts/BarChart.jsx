import moment from "moment";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Card = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  background-color: ${({ theme }) => theme.card};
  padding: 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  @media (max-width: 600px) {
    padding: 16px 12px;
    max-width: 95%;
    height: 60vh;
  }
`;

const ItemTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;

const BarWrapper = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 600px) {
    height: 55vh;
  }
`;

const BarChartComponent = ({ tasks }) => {
  const theme = useTheme();
  const [weekDates, setWeekDates] = useState([]);
  const [data, setData] = useState({
    labels: weekDates,
    datasets: [
      {
        label: "Work",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: theme.work,
        borderColor: theme.work,
        borderWidth: 1
      },
      {
        label: "Meeting",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: theme.meeting,
        borderColor: theme.meeting,
        borderWidth: 1
      },
      {
        label: "Break",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: theme.break,
        borderColor: theme.break,
        borderWidth: 1
      }
    ]
  });

  // set the week days and data
  useEffect(() => {
    const today = new Date();
    const weekDates = [];
    const tempData = {
      labels: weekDates,
      datasets: [
        {
          label: "Work",
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: theme.work,
          borderColor: theme.work,
          borderWidth: 1
        },
        {
          label: "Meeting",
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: theme.meeting,
          borderColor: theme.meeting,
          borderWidth: 1
        },
        {
          label: "Break",
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: theme.break,
          borderColor: theme.break,
          borderWidth: 1
        }
      ]
    };

    for (let i = 0; i < 7; i += 1) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      weekDates.push(
        `${moment(date).format("ddd")} - ${moment(date).format("DD MMM")}`
      );
    }

    tasks
      ?.slice()
      .reverse()
      .forEach((task) => {
        const day = `${moment(task.start_time).format("ddd")} - ${moment(
          task.start_time
        ).format("DD MMM")}`;
        const index = weekDates.findIndex((date) => date.includes(day));
        if (task.task_type === "work") {
          tempData.datasets[0].data[index] += task.time_taken;
        } else if (task.task_type === "meeting") {
          tempData.datasets[1].data[index] += task.time_taken;
        } else {
          tempData.datasets[2].data[index] += task.time_taken;
        }
      });

    setData({ ...tempData });
    setWeekDates(weekDates);
  }, [theme, tasks]);

  const options = { maintainAspectRatio: false };

  return (
    <Card>
      <ItemTitle>This week Tasks</ItemTitle>
      <BarWrapper>
        <Bar data={data} style={{ margin: "12px" }} options={options} />
      </BarWrapper>
    </Card>
  );
};

export default BarChartComponent;
