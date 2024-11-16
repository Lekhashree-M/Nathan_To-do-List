import React, { useState } from "react";

function WeeklyTodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
  
    // Get today's date
    const today = new Date();
    // Calculate yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    // Format today's and yesterday's dates
    const formattedDate = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  
    const formattedYesterday = yesterday.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  
    // Calculate the start and end of the current week (Sunday to Saturday)
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday
    firstDayOfWeek.setHours(0, 0, 0, 0); // Set to midnight
  
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Set to Saturday
    lastDayOfWeek.setHours(23, 59, 59, 999); // Set to end of the day
  
    // Format the start and end of the week
    const formattedStartOfWeek = firstDayOfWeek.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  
    const formattedEndOfWeek = lastDayOfWeek.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  
    // Helper function to calculate progress
    const calculateProgress = (task) => {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
  
      if (today < start) return 0; // Task hasn't started
      if (today > end) return 100; // Task is complete
  
      const totalDuration = end - start;
      const elapsedDuration = today - start;
  
      return Math.round((elapsedDuration / totalDuration) * 100); // Calculate progress
    };
  
    // Helper function to add a new task
    const handleAddTask = () => {
      if (taskName.trim() === "" || !startDate || !endDate || !priority) return;
  
      // Ensure the start and end dates are within the current week
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      if (start < firstDayOfWeek || end > lastDayOfWeek) {
        alert("Task start and end dates must be within the current week.");
        return;
      }
  
      // Calculate progress when the task is created
      const progress = calculateProgress({ startDate, endDate });
  
      const newTask = {
        id: Date.now(),
        taskName,
        priority,
        startDate,
        endDate,
        isCompleted,
        progress, // Add progress to task object
      };
  
      setTasks([...tasks, newTask]);
      resetForm();
    };
  
    // Reset the form fields
    const resetForm = () => {
      setTaskName("");
      setPriority("");
      setStartDate("");
      setEndDate("");
      setIsCompleted(false);
    };
  
    // Toggle task completion
    const toggleCompletion = (taskId) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
    };
  
    // Filter tasks for the current week
    const weeklyTasks = tasks.filter(
      (task) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);
        return taskStartDate >= firstDayOfWeek && taskEndDate <= lastDayOfWeek;
      }
    );
  
    // Filter tasks for yesterday
    const yesterdaysTasks = tasks.filter(
      (task) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);
        return (
          taskStartDate.toLocaleDateString() === formattedYesterday ||
          taskEndDate.toLocaleDateString() === formattedYesterday
        );
      }
    );
  
    // Function to get progress bar color based on the percentage
    const getProgressBarColor = (progress) => {
      const colors = [
        "#6DA951", // Green (0-15%)
        "#4CAF50", // Light green (16-30%)
        "#FFA33C", // Orange (76-90%)
        "#FC7033", // Red-orange (91-99%)
        "#FA4032", // True Red (100%)
      ];
  
      // Return color based on the progress, gradually transitioning from green to red
      return colors[Math.floor(progress / 20)] || "#FA4032";  // Ensure red at 100%
    };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto flex space-x-4 mb-6">
        {/* Weekly Checklist Section */}
        <div className="w-2/3 rounded-lg shadow-lg p-5" style={{ backgroundColor: "#F0C1E1" }}>
  <div className="flex items-center justify-center mb-4">
    <h1 className="text-2xl font-semibold text-center" style={{ color: "#2e2e2e" }}>
      Weekly Checklist
    </h1>
  </div>
  <div className="flex items-center pb-2">
    <h1 className="text-xl font-semibold" style={{ color: "#2e2e2e" }}>
      Week:
    </h1>
    <h1 className="text-xl ml-2" style={{ color: "#2e2e2e" }}>
      {formattedStartOfWeek} - {formattedEndOfWeek}
    </h1>
  </div>
  <div className="flex items-center mt-2">
    {/* <h1 className="text-xl" style={{ color: "#2e2e2e" }}>
      {formattedStartOfWeek.split(",")[0]}, {formattedStartOfWeek.split(",")[1]} -
      {formattedEndOfWeek.split(",")[0]}, {formattedEndOfWeek.split(",")[1]}
    </h1> */}
  </div>

  {/* Task Form */}
  <div className="space-y-4 mb-6">
    <input
      type="text"
      value={taskName}
      onChange={(e) => setTaskName(e.target.value)}
      className="w-full p-3 border rounded-md border-gray-300"
      placeholder="Task Name"
    />
    <div className="flex space-x-4">
      <div className="w-1/3">
        <label className="block text-black pb-2">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="">None</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="w-1/3">
        <label className="block text-black pb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      <div className="w-1/3">
        <label className="block text-black pb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
    </div>
    <button onClick={handleAddTask} className="w-full py-3 rounded-md bg-[#674188] text-white">
      Add Task
    </button>
  </div>
</div>


 {/* Yesterday's Tasks Section */}
 <div
          className="w-1/3 rounded-lg shadow-lg p-5"
          style={{ backgroundColor: "#F0C1E1" }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#3d3d3d" }}>
            Last Week's Tasks
          </h2>
          <ul className="space-y-4">
            {yesterdaysTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-3 rounded-lg bg-white"
              >
                <span>{task.taskName}</span>
                <button
                  onClick={() => toggleCompletion(task.id)}
                  className={`${
                    task.isCompleted ? "bg-green-500" : "bg-gray-400"
                  } text-white py-1 px-4 rounded`}
                >
                  {task.isCompleted ? "Completed" : "Incomplete"}
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Task Table for Weekly Tasks */}
      <div className="mt-6 max-w-4xl mx-auto rounded-lg shadow-lg p-6 bg-[#F0C1E1]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-[#674188] text-white">
                <th className="px-4 py-3">Task Name</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">End Date</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Completed</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[#F0C1E1]">
              {weeklyTasks.map((task) => (
                <tr
                  key={task.id}
                  className={`border-t ${task.isCompleted ? "bg-green-100" : ""}`}
                >
                  <td className="px-4 py-2 text-center text-black">{task.taskName}</td>
                  <td className="px-4 py-2 text-center text-black">{task.priority}</td>
                  <td className="px-4 py-2 text-center text-black">
                    {new Date(task.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center text-black">
                    {new Date(task.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <div className="relative w-full h-6 rounded-full bg-gray-300 text-center">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${task.progress}%`,
                          backgroundColor: getProgressBarColor(task.progress),
                        }}
                      ></div>
                      <span className="absolute right-2 top-1 text-xs font-semibold text-white">
                        {task.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleCompletion(task.id)}
                      disabled={task.progress === 100} // Disable checkbox if progress is 100%
                      style={{ transform: "scale(1.5)" }} // Scale the checkbox size
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="py-1 px-2 rounded-md bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WeeklyTodoList;
