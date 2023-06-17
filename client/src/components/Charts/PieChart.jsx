import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "styled-components";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const Card = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  background-color: ${({ theme }) => theme.card};
  padding: 18px 18px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  @media (max-width: 600px) {
    max-width: 95%;
  }
`;

const ItemTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;

const Filter = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  padding: 6px 12px;
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
  font-size: 12px;
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
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  background-color: ${({ theme }) => theme.card};
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 16px;
  }
`;

const PieChart = ({ tasks, showType }) => {
  const theme = useTheme();
  const [customDate, setCustomDate] = useState(null);
  const [title, setTitle] = useState(
    showType === "today" ? "Today's" : "Yesterday's"
  );
  const [data, setData] = useState();

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const [filter, setFilter] = useState([
    showType === "today" ? today : yesterday
  ]);

  const handleFilter = (e) => {
    const { value } = e.target;

    if (value === "Yesterday") {
      setTitle("Yesterday's");
      setFilter([yesterday]);
      setCustomDate(null);
    } else if (value === "All") {
      setTitle("All");
      setFilter([]);
      setCustomDate(null);
    } else if (value === "Last 7 Days") {
      setTitle("Last 7 Day's");
      const lastWeekStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 6
      );
      setFilter([lastWeekStart, today]);
      setCustomDate(null);
    } else if (value === "This Week") {
      setTitle("This Week's");
      const thisWeekStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
      );
      const thisWeekEnd = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() + 6
      );
      setFilter([thisWeekStart, thisWeekEnd]);
      setCustomDate(null);
    } else if (value === "This Month") {
      setTitle("This Month's");
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const thisMonthEnd = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      setFilter([thisMonthStart, thisMonthEnd]);
      setCustomDate(null);
    } else if (value === "This Year") {
      setTitle("This Year's");
      const thisYearStart = new Date(today.getFullYear(), 0, 1);
      const thisYearEnd = new Date(today.getFullYear(), 11, 31);
      setFilter([thisYearStart, thisYearEnd]);
      setCustomDate(null);
    } else if (value === "Custom") {
      setTitle("Custom Date");
      setCustomDate(new Date());
      setFilter([]);
    }
  };

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const taskStartTime = new Date(task.start_time);

      if (filter.length === 0) {
        if (customDate) {
          const customDateObj = new Date(customDate);
          return (
            taskStartTime.getDate() === customDateObj.getDate() &&
            taskStartTime.getMonth() === customDateObj.getMonth() &&
            taskStartTime.getFullYear() === customDateObj.getFullYear()
          );
        }
        return true;
      }
      if (filter.length === 2 && filter[0] && filter[1]) {
        return taskStartTime >= filter[0] && taskStartTime <= filter[1];
      }
      if (filter.length === 1 && filter[0]) {
        return (
          taskStartTime.getDate() === filter[0].getDate() &&
          taskStartTime.getMonth() === filter[0].getMonth() &&
          taskStartTime.getFullYear() === filter[0].getFullYear()
        );
      }
      return false;
    });

    function calculateTime(type) {
      let sum = 0;

      for (let i = 0; i < filteredTasks.length; i += 1) {
        if (filteredTasks[i].task_type === type) {
          sum += parseFloat(filteredTasks[i].time_taken);
        }
      }

      return sum;
    }

    const tasksSums = [
      calculateTime("work"),
      calculateTime("meeting"),
      calculateTime("break")
    ];

    if (tasksSums.every((sum) => sum === 0)) {
      setData({
        labels: ["No Tasks"],
        datasets: [
          {
            label: "No tasks found",
            data: [1],
            backgroundColor: [theme.text_secondary + 90],
            hoverOffset: 4,
            rotation: 0
          }
        ]
      });
    } else {
      setData({
        labels: ["Work", "Meeting", "Break"],
        datasets: [
          {
            label: "Total time(minutes)",
            data: tasksSums,
            backgroundColor: [theme.work, theme.meeting, theme.break],
            hoverOffset: 8,
            rotation: 0
          }
        ]
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, customDate, tasks]);

  const options = { maintainAspectRatio: true };

  return (
    <Card>
      <ItemTitle>{title} Tasks</ItemTitle>
      {data && <Pie data={data} style={{ margin: "12px" }} options={options} />}
      {showType !== "today" && (
        <Filter>
          <FilterText>Filter Tasks:</FilterText>
          <FilterSelect onChange={(e) => handleFilter(e)}>
            <FilterOption selected value="Yesterday">
              Yesterday
            </FilterOption>
            <FilterOption value="All">All</FilterOption>
            <FilterOption value="Last 7 Days">Last 7 Days</FilterOption>
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
      )}
    </Card>
  );
};

export default PieChart;
