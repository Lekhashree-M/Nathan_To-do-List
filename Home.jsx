import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion"; 

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-md shadow-lg">
      <div className="flex items-center gap-6">
        <a href="#" className="text-lg font-semibold hover:text-gray-300">
          Home
        </a>

        <div className="relative group">
          <button className="text-lg font-semibold hover:text-gray-300">
            Goals
          </button>
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

      <div className="flex items-center gap-6">
        <div className="relative group">
          <button className="flex items-center gap-2 text-lg font-semibold hover:text-gray-300">
            <img
              src="https://www.gravatar.com/avatar?d=mp"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>Username</span>
          </button>
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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex justify-between items-center p-4 text-white rounded-md ">
      <div className="text-left">
        <h2 className="text-lg text-black font-bold">{formattedDate}</h2>
      </div>
      <div className="text-right">
        <h2 className="text-lg text-black font-bold">{formattedTime}</h2>
      </div>
    </div>
  );
};

const DailyGoals = () => {
  const dailyTasks = [
    "1. Reading",
    "2. Listening to Music",
    "3. Exercise",
    "4. Meditate",
    "5. Write Journal",
  ];

  const tasks = [
    "Plan the week",
    "Finish project",
    "Attend meeting",
    "Workout",
    "Read a book",
  ]; // Example tasks for the weekly section

  const dayStatus = tasks.map(() => Array(7).fill(false)); // Weekly status for each task

  // Existing code continues...


  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dailyToday = new Date().getDay(); // Current day index (0-6)

  // State to track task completion for the day
  const [dailyTaskCompletion, setDailyTaskCompletion] = useState(
    Array(dailyTasks.length).fill(false)
  );

  // State to track daily status for each task and day
  const [dailyDayStatus, setDailyDayStatus] = useState(
    dailyTasks.map(() => Array(7).fill(false))
  );

  // Toggle daily task completion
  const toggleDailyTaskCompletion = (taskIndex) => {
    setDailyTaskCompletion((prevState) => {
      const newState = [...prevState];
      newState[taskIndex] = !newState[taskIndex];
      return newState;
    });
  };

  // Handle day-specific task completion
  const handleDailyDayClick = (taskIndex, dayIndex) => {
    setDailyDayStatus((prevState) => {
      const newState = [...prevState];
      newState[taskIndex][dayIndex] = !newState[taskIndex][dayIndex];
      return newState;
    });
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Container for Daily Goals and Calendar (2-column layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-rose-100 p-6 rounded-lg shadow-lg">
        {/* Daily Goals */}
        <div className="flex-1 bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Daily Goals</h2>
          <div className="space-y-2">
            {dailyTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-center">
                <input
                  type="checkbox"
                  checked={dailyTaskCompletion[taskIndex]}
                  onChange={() => toggleDailyTaskCompletion(taskIndex)}
                  className="mr-2 cursor-pointer"
                />
                <span
                  className={`text-lg ${
                    dailyTaskCompletion[taskIndex]
                      ? "line-through text-gray-800"
                      : "text-gray-700"
                  }`}
                >
                  {task}
                </span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Daily Calendar */}
        <div className="flex-1 bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Daily Calendar</h2>
          <div className="grid grid-cols-7 gap-4 text-center">
            {days.map((day, dayIndex) => (
              <div key={dayIndex}>
                <h3
                  className={`text-sm font-bold ${
                    dayIndex === dailyToday ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {day}
                </h3>
                <div className="flex flex-col items-center space-y-2 mt-2">
                  {dailyTasks.map((_, taskIndex) => (
                    <input
                      key={taskIndex}
                      type="checkbox"
                      checked={dailyDayStatus[taskIndex][dayIndex]}
                      onChange={() => handleDailyDayClick(taskIndex, dayIndex)}
                      disabled={
                        !dailyTaskCompletion[taskIndex] ||
                        dayIndex !== dailyToday
                      }
                      className={`h-6 w-6 ${
                        dailyDayStatus[taskIndex][dayIndex]
                          ? "bg-green-200"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Container for Weekly Goals and Calendar (2-column layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-100 p-6 rounded-lg shadow-lg">
        {/* Weekly Goals */}
        <div className="flex-1 bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Weekly Goals</h2>
          <div className="space-y-2">
            {tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-center">
                <span className="text-lg text-gray-700">{task}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Weekly Calendar */}
        <div className="flex-1 bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Weekly Calendar
          </h2>
          <div className="grid grid-cols-7 gap-5 text-center">
            {days.map((day, dayIndex) => (
              <div key={dayIndex}>
                <h3 className="text-sm font-bold text-gray-700">{day}</h3>
                <div className="flex flex-col items-center space-y-2 mt-2">
                  {tasks.map((_, taskIndex) => (
                    <input
                      key={taskIndex}
                      type="checkbox"
                      checked={dayStatus[taskIndex][dayIndex]}
                      onChange={() => handleDayClick(taskIndex, dayIndex)}
                      className={`h-6 w-6 ${
                        dayStatus[taskIndex][dayIndex]
                          ? "bg-green-200"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );  
};


// Gratitude List Component
const GratitudeList = () => {
  const [gratitudes, setGratitudes] = useState([]);
  const [newGratitude, setNewGratitude] = useState("");

  // Add gratitude entry
  const addGratitude = () => {
    if (newGratitude.trim() === "") return; // Prevent empty entries
    setGratitudes([...gratitudes, newGratitude]); // Add new entry
    setNewGratitude(""); // Clear input
  };

  // Remove gratitude entry
  const removeGratitude = (index) => {
    setGratitudes(gratitudes.filter((_, i) => i !== index));
  };
  
  return (
    <div className="max-w-md mx-auto mt-8 bg-orange-200 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Gratitude List</h2>

      {/* Input Section */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="What are you grateful for?"
          value={newGratitude}
          onChange={(e) => setNewGratitude(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={addGratitude}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Add
        </button>
      </div>

      {/* Gratitude List */}
      <ul className="space-y-2">
        <AnimatePresence>
          {gratitudes.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between p-3 rounded shadow-sm bg-green-100"
            >
              <span className="text-gray-800 flex-grow">{item}</span>
              <button
                onClick={() => removeGratitude(index)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
        {gratitudes.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-center"
          >
            Your gratitude list is empty. Start adding!
          </motion.p>
        )}
      </ul>
    </div>
  );
};

const CouponsContainer = () => {
  const [completedTasks, setCompletedTasks] = useState([
    "Task 1",
    "Task 2", // Example tasks completed by user
  ]);
  const [coupons, setCoupons] = useState([]);

  // Logic to set coupons based on completed tasks
  useEffect(() => {
    const newCoupons = [];
    if (completedTasks.includes("Task 1")) {
      newCoupons.push("Coupon for Task 1");
    }
    if (completedTasks.includes("Task 2")) {
      newCoupons.push("Coupon for Task 2");
    }
    if (completedTasks.includes("Task 3")) {
      newCoupons.push("Coupon for Task 3");
    }
    setCoupons(newCoupons);
  }, [completedTasks]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-rose-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Achieved Coupons</h2>
      
      {coupons.length > 0 ? (
        <div className="space-y-4">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className="p-4 bg-green-100 text-green-800 rounded-md shadow-md"
            >
              {coupon}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No coupons yet. Complete tasks to earn coupons!</p>
      )}
    </div>
  );
};

const Priorit = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");

  // Add task with priority
  const addTask = () => {
    if (newTask.trim() === "") return; // Prevent empty tasks
    setTasks([
      ...tasks,
      { text: newTask, priority: taskPriority }
    ]);
    setNewTask(""); // Clear input
    setTaskPriority("Low"); // Reset priority to Low after adding
  };

  // Remove task by index
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Function to get background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100';
      case 'Medium':
        return 'bg-yellow-100';
      case 'Low':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-gray-100 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Priority Task List</h2>

      {/* Input Section */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="What task do you need to do?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Add Task
        </button>
      </div>

      {/* Task Containers */}
      <div className="flex space-x-4">
        {/* High Priority Container */}
        <div className="w-1/3 bg-red-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-red-700">High Priority</h3>
          <ul className="space-y-2">
            <AnimatePresence>
              {tasks.filter(task => task.priority === 'High').map((task, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-3 rounded shadow-sm bg-red-100"
                >
                  <span className="text-gray-800 flex-grow">{task.text}</span>
                  <button
                    onClick={() => removeTask(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* Medium Priority Container */}
        <div className="w-1/3 bg-yellow-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-yellow-700">Medium Priority</h3>
          <ul className="space-y-2">
            <AnimatePresence>
              {tasks.filter(task => task.priority === 'Medium').map((task, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-3 rounded shadow-sm bg-yellow-100"
                >
                  <span className="text-gray-800 flex-grow">{task.text}</span>
                  <button
                    onClick={() => removeTask(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600 transition duration-300"
                  >
                    Remove
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* Low Priority Container */}
        <div className="w-1/3 bg-green-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-green-700">Low Priority</h3>
          <ul className="space-y-2">
            <AnimatePresence>
              {tasks.filter(task => task.priority === 'Low').map((task, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-3 rounded shadow-sm bg-green-100"
                >
                  <span className="text-gray-800 flex-grow">{task.text}</span>
                  <button
                    onClick={() => removeTask(index)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600 transition duration-300"
                  >
                    Remove
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
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
      <DailyGoals />
      <GratitudeList />
      <CouponsContainer />
      <AnimatePresence />
      <Priorit />
    </div>
  );
}




export default App;
