import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Time Period Button Component
const TimePeriodButton = ({ period, selectedPeriod, onClick }) => (
  <button
    onClick={() => onClick(period)}
    className={`px-4 py-2 rounded ${selectedPeriod === period ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
  >
    {period.charAt(0).toUpperCase() + period.slice(1)}
  </button>
);

// Reusable Chart Component
const Chart = ({ data, options, title }) => (
  <div className="bg-white p-4 rounded shadow-md mb-6 max-w-4xl mx-auto">
    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">{title}</h2>
    <Bar data={data} options={options} />
  </div>
);

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("daily");

  // Task statuses and their corresponding colors
  const taskStatuses = ["Completed", "Overdue", "Pending"];
  const taskColors = [
    "#6BBF6A",  // Completed (lighter green)
  "#FF4C4C",//overdue
  "#F8F900"  // pending  (lighter red)
  ];

  // Function to get data for Planned, Overdue, and Pending tasks
  const getTaskStatusData = () => {
    const taskData = {
      daily: [5, 8, 6, 7, 3, 2, 9],
      weekly: [30, 25, 35, 40],
      monthly: [15, 12, 14, 16, 18, 17, 19, 20, 21, 23, 22, 24],
    };
    
    const taskOverdue = {
      daily: [1, 0, 2, 1, 1, 0, 6],
      weekly: [5, 10, 8, 6],
      monthly: [20, 15, 18, 12, 10, 15, 10, 8, 12, 15, 18, 20],
    };

    const taskPending = {
      daily: [3, 5, 4, 3, 6, 4, 4],
      weekly: [12, 15, 10, 8],
      monthly: [40, 50, 30, 20, 25, 30, 40, 50, 60, 55, 50, 60],
    };

    return {
      labels: timePeriod === "daily" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] :
             timePeriod === "weekly" ? ["Week 1", "Week 2", "Week 3", "Week 4"] : 
             ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Completed",
          data: timePeriod === "daily" ? taskData.daily : timePeriod === "weekly" ? taskData.weekly : taskData.monthly,
          backgroundColor: taskColors[0], // Green color for Completed
        },
        {
          label: "Overdue",
          data: timePeriod === "daily" ? taskOverdue.daily : timePeriod === "weekly" ? taskOverdue.weekly : taskOverdue.monthly,
          backgroundColor: taskColors[1], // Red color for Overdue
        },
        {
          label: "Pending",
          data: timePeriod === "daily" ? taskPending.daily : timePeriod === "weekly" ? taskPending.weekly : taskPending.monthly,
          backgroundColor: taskColors[2], // Red-Orange color for Pending
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">Task Dashboard</h1>

      {/* Time Period Selection */}
      <div className="flex justify-center space-x-4 mb-6">
        {["daily", "weekly", "monthly"].map((period) => (
          <TimePeriodButton
            key={period}
            period={period}
            selectedPeriod={timePeriod}
            onClick={setTimePeriod}
          />
        ))}
      </div>

      {/* Planned, Overdue, and Pending Tasks Chart */}
      <Chart
        data={getTaskStatusData()}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: timePeriod === "daily" ? "Days" : timePeriod === "weekly" ? "Weeks" : "Months",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Tasks",
              },
              grid: {
                display: false,  // Remove horizontal grid lines
              },
            },
          },
        }}
        title={`Completed, Overdue, and Pending Tasks - ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}`}
      />
    </div>
  );
};

export default Dashboard;
