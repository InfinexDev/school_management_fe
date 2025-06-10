import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-teal-600 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-white text-2xl font-extrabold tracking-tight">
                EduManage
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/fees"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
            >
              Fees
            </NavLink>
            <NavLink
              to="/study-materials"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
            >
              Study Materials
            </NavLink>
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
            >
              Attendance
            </NavLink>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
            >
              Notifications
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
            >
              Reports
            </NavLink>
            <NavLink
              to="/promotions"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
            >
              Promotions
            </NavLink>
            <NavLink
              to="/login"
              className="text-white bg-teal-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-800 shadow-md"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="text-white bg-teal-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-800 shadow-md"
            >
              Sign Up
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-teal-300 p-2 rounded-md transition-transform duration-300 ease-in-out"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7 transform transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-teal-600 shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/fees"
              className={({ isActive }) =>
                `block text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Fees
            </NavLink>
            <NavLink
              to="/study-materials"
              className={({ isActive }) =>
                `block text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Study Materials
            </NavLink>
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `block text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Attendance
            </NavLink>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `block text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Notifications
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `block text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Reports
            </NavLink>
            <NavLink
              to="/promotions"
              className={({ isActive }) =>
                `block text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Promotions
            </NavLink>
            <NavLink
              to="/login"
              className="block text-white bg-teal-700 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-800 shadow-md"
              onClick={toggleMenu}
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;