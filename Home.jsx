import React, { useState, useEffect } from "react";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-md shadow-lg">
      {/* Home and Goals with Dropdown */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-lg font-semibold hover:text-gray-300">
          Home
        </a>

        <div className="relative group">
          <button className="text-lg font-semibold hover:text-gray-300">
            Goals
          </button>
          {/* Dropdown content */}
          <div className="absolute hidden group-hover:block bg-gray-700 rounded shadow-lg mt-2">
            <a
              href="/.TodoChecklist"
              className="block px-4 py-2 hover:bg-gray-600"
            >
              Daily Goals
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Weekly Goals
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Monthly Goals
            </a>
          </div>
        </div>
      </div>

      {/* Profile and Level */}
      <div className="flex items-center gap-6">
        {/* Profile Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 text-lg font-semibold hover:text-gray-300">
            <img
              src="https://www.gravatar.com/avatar?d=mp" // Example Gravatar image URL, replace with actual user image
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>Username</span>
          </button>
          {/* Profile Dropdown content */}
          <div className="absolute hidden group-hover:block bg-gray-700 rounded shadow-lg mt-2">
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Profile
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Settings
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Logout
            </a>
          </div>
        </div>

        {/* Static Coins and Level */}
        <div className="flex items-center gap-6">
          <span className="bg-purple-600 text-white px-3 py-1 rounded transition-transform duration-300 ease-in-out hover:scale-105">
            Coins: 0
          </span>
          <span className="bg-orange-500 text-white px-3 py-1 rounded transition-transform duration-300 ease-in-out hover:scale-105">
            Level: 1
          </span>
        </div>
      </div>
    </nav>
  );
};

const TimeDay = () => {
  // State for current date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  // Format the current day and date
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long", // Full name of the day
    month: "short", // Abbreviated month
    day: "numeric", // Day of the month
    year: "numeric", // Full year
  });

  // Format the current time
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex justify-between items-center p-4 text-white rounded-md ">
      {/* Left: Day and Date */}
      <div className="text-left">
        <h2 className="text-lg text-black font-bold">{formattedDate}</h2>
      </div>

      {/* Right: Time */}
      <div className="text-right">
        <h2 className="text-lg text-black font-bold">{formattedTime}</h2>
      </div>
    </div>
  );
};

const Weekly = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const tasks = [
    "1. Reading",
    "2. Listening to Music",
    "3. Exercise",
    "4. Meditate",
    "5. Write Journal"
  ];

  // State for daily task completion
  const [dayStatus, setDayStatus] = useState(
    tasks.map(() => Array(7).fill(false)) // 7 days of the week
  );

  // Handle day task completion for the specific day within the week
  const handleDayClick = (taskIndex, dayIndex) => {
    setDayStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[taskIndex][dayIndex] = !updatedStatus[taskIndex][dayIndex];
      return updatedStatus;
    });
  };

  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Weekly Goals</h2>
      <div className="flex gap-8">
        {/* Left Side: Weekly Calendar */}
        <div className="flex-1 bg-blue-300 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Calendar (This Week)</h2>
          {/* Display the day labels (columns) */}
          <div className="grid grid-cols-7 gap-5 text-center">
            {days.map((day, dayIndex) => (
              <div key={dayIndex}>
                <h3 className="text-sm font-bold text-gray-700">{day}</h3>
                {/* Display tasks under each day as a column */}
                <div className="flex flex-col items-center space-y-2 mt-2">
                  {tasks.map((_, taskIndex) => (
                    <input
                      key={taskIndex}
                      type="checkbox"
                      checked={dayStatus[taskIndex][dayIndex]}
                      onChange={() => handleDayClick(taskIndex, dayIndex)}
                      className={`h-6 w-6 ${dayStatus[taskIndex][dayIndex] ? "bg-green-200" : "bg-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Task List */}
        <div className="flex-1 bg-gray-100 p-4 rounded-md shadow-sm">
          <div className="space-y-2">
            {tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-center">
                <span className="text-lg text-gray-700">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DailyGoals = () => {
  const [dailyTaskCompletion, setDailyTaskCompletion] = useState(
    Array(5).fill(false)
  );

  const dailyTasks = [
    "1. Reading",
    "2. Listening to Music",
    "3. Exercise",
    "4. Meditate",
    "5. Write Journal"
  ];

  const toggleDailyTaskCompletion = (taskIndex) => {
    setDailyTaskCompletion((prevState) => {
      const newState = [...prevState];
      newState[taskIndex] = !newState[taskIndex];
      return newState;
    });
  };

  return (
    <div className="flex-1 bg-red-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Daily Goals</h2>
      <div className="flex gap-8">
        {/* Left Side: Daily Calendar */}
        <div className="flex-1 bg-rose-200 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Calendar</h2>
          <div className="grid grid-cols-7 gap-5 text-center">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, dayIndex) => (
              <div key={dayIndex}>
                <h3 className="text-sm font-bold text-gray-700">{day}</h3>
                <input
                  type="checkbox"
                  checked={dailyTaskCompletion[dayIndex]}
                  onChange={() => toggleDailyTaskCompletion(dayIndex)}
                  className={`h-6 w-6 ${
                    dailyTaskCompletion[dayIndex] ? "bg-green-200" : "bg-gray-200"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Task List */}
        <div className="flex-1 bg-gray-200 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Tasks</h2>
          <div className="space-y-2">
            {dailyTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-center">
                <span className="text-lg text-gray-700">{task}</span>
                <input
                  type="checkbox"
                  checked={dailyTaskCompletion[taskIndex]}
                  onChange={() => toggleDailyTaskCompletion(taskIndex)}
                  className={`ml-2 h-6 w-6 ${
                    dailyTaskCompletion[taskIndex] ? "bg-green-200" : "bg-gray-200"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <NavBar />
      <TimeDay />
      <div className="flex gap-6">
        <DailyGoals />
        <Weekly />
      </div>
    </div>
  );
}

export default App;
