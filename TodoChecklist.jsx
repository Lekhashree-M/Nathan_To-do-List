import React, { useState, useEffect } from "react";

function TodoChecklist() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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

  // Helper function to add a new task
  const handleAddTask = () => {
    if (taskName.trim() === "" || !startTime || !endTime || !priority) return;

    const newTask = {
      id: Date.now(),
      taskName,
      priority,
      startTime,
      endTime,
      date: today.toLocaleDateString("en-US"), // Store the date as a string
      progress: 0,
      isCompleted,
    };

    setTasks([...tasks, newTask]);
    resetForm();
  };

  const resetForm = () => {
    setTaskName("");
    setPriority("");
    setStartTime("");
    setEndTime("");
    setIsCompleted(false);
  };

  // Calculate task progress based on current time
  const calculateProgress = (start, end) => {
    const currentTime = new Date();
    const startTime = new Date(currentTime.toDateString() + " " + start);
    const endTime = new Date(currentTime.toDateString() + " " + end);

    if (currentTime < startTime) return 0;
    if (currentTime > endTime) return 100;

    const totalDuration = endTime - startTime;
    const timePassed = currentTime - startTime;

    return Math.round((timePassed / totalDuration) * 100);
  };

  // Update task progress every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          progress: calculateProgress(task.startTime, task.endTime),
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle task completion
  const toggleCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  // Delete a task by ID
  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Get color based on progress level
  const getProgressColor = (progress) => {
    const colors = [
      "#6DA951", // Green (0-15%)
      "#4CAF50", // Light green (16-30%)
      "#FFA33C", // Orange (76-90%)
      "#FC7033", // Red-orange (91-99%)
      "#FA4032", // True Red (100%)
    ];

    return colors[Math.floor(progress / 20)] || "#FA4032"; // Ensure red at 100%
  };

  // Filter tasks for yesterday
  const yesterdaysTasks = tasks.filter(
    (task) => task.date === formattedYesterday
  );

  // Move completed tasks to Yesterday's Tasks section
  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.isCompleted);
    const todayTasks = tasks.filter((task) => !task.isCompleted);

    setTasks(todayTasks); // Remove completed tasks from today's list
    completedTasks.forEach((task) => {
      task.date = formattedYesterday; // Update date to yesterday for completed tasks
      setTasks((prevTasks) => [...prevTasks, task]); // Add to the task list with updated date
    });
  }, [tasks]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "" }}>
      <div className="max-w-4xl mx-auto flex space-x-4 mb-6">
        {/* Daily Checklist Section */}
        <div
          className="w-2/3 rounded-lg shadow-lg p-5"
          style={{ backgroundColor: "#F0C1E1" }}
        >
          <div className="flex items-center justify-between">
            <h1
              className="text-2xl font-semibold text-left mb-6"
              style={{ color: "#2e2e2e" }}
            >
              Daily Checklist
            </h1>

            <div className="flex items-center">
              <h1
                className="text-2xl font-semibold text-right pr-3 mb-6"
                style={{ color: "#2e2e2e" }}
              >
                Date:
              </h1>
              <h1 className="text-xl mb-5" style={{ color: "#2e2e2e" }}>
                {formattedDate}
              </h1>
            </div>
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
                <label className="block text-black">Priority</label>
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
                <label className="block text-black">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-black">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              onClick={handleAddTask}
              className="w-full py-3 rounded-md bg-[#674188] text-white"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Yesterday's Tasks Section */}
        <div
          className="w-1/3 rounded-lg shadow-lg p-5"
          style={{ backgroundColor: "#F0C1E1" }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#3d3d3d" }}
          >
            Yesterday's Tasks
          </h2>
          <ul className="space-y-2">
            {yesterdaysTasks.length > 0 ? (
              yesterdaysTasks.map((task) => (
                <li
                  key={task.id}
                  className="p-2 rounded-md"
                  style={{ backgroundColor: "#ffecb3", color: "#3d3d3d" }}
                >
                  <strong>{task.taskName}</strong> - {task.priority}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No tasks from yesterday.</li>
            )}
          </ul>
        </div>
      </div>
      {/* Task Table */}
      <div className="mt-6 max-w-4xl mx-auto rounded-lg shadow-lg p-6 bg-[#]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-[#674188] text-white">
                <th className="px-4 py-3">Task Name</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Start Time</th>
                <th className="px-4 py-3">End Time</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Completed</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[#F0C1E1]">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className={`border-t ${task.isCompleted ? "bg-green-100" : ""}`}
                >
                  <td className="px-4 py-2 text-center text-black">
                    {task.taskName}
                  </td>
                  <td className="px-4 py-2 text-center text-black">
                    {task.priority}
                  </td>
                  <td className="px-4 py-2 text-center text-black">
                    {task.startTime}
                  </td>
                  <td className="px-4 py-2 text-center text-black">
                    {task.endTime}
                  </td>
                  <td className="px-4 py-2">
                    <div className="relative w-full h-6 rounded-full bg-gray-300 text-center">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${task.progress}%`,
                          backgroundColor: getProgressColor(task.progress),
                        }}
                      ></div>
                      <span className="absolute right-2 top-1 text-xs font-semibold text-white">
                        {task.progress === 100
                          ? "Incompleted"
                          : `${task.progress}%`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleCompletion(task.id)}
                      disabled={task.progress === 100}
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

export default TodoChecklist;
