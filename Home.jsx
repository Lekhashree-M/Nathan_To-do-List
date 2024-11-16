import React from 'react'
import TodoChecklist from 'react';

const Home = () => {
    return (
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
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
              <a href="/.TodoChecklist" className="block px-4 py-2 hover:bg-gray-600">
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
            <span className='bg-purple-600 text-white px-3 py-1 rounded transition-transform duration-300 ease-in-out hover:scale-105'>Coins: 0</span>
            <span className='bg-orange-500 text-white px-3 py-1 rounded transition-transform duration-300 ease-in-out hover:scale-105'>Level: 1</span>
          </div>
        </div>
      </nav>
    );
  };
  

export default Home;