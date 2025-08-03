import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import school_logo from '../assets/school_logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    window.location.href = '/home';
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  return (
    <nav className="bg-teal-600 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Home */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <img src={school_logo} className="rounded-full w-24 h-12" alt="school_logo" />
            </NavLink>
            {!token && (
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `hidden md:flex text-white ml-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                  }`
                }
              >
                Home
              </NavLink>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {token && (
              <>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/study-materials"
                  className={({ isActive }) =>
                    `text-white px-4 py-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                    }`
                  }
                >
                  Study Materials
                </NavLink>
                <NavLink
                  to="/attendance"
                  className={({ isActive }) =>
                    `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                    }`
                  }
                >
                  Attendance
                </NavLink>
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                    }`
                  }
                >
                  Notifications
                </NavLink>
                <NavLink
                  to="/fees"
                  className={({ isActive }) =>
                    `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                    }`
                  }
                >
                  Fees
                </NavLink>
                <NavLink
                  to="/reports"
                  className={({ isActive }) =>
                    `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                    }`
                  }
                >
                  Reports
                </NavLink>
                <NavLink
                  to="/promotions"
                  className={({ isActive }) =>
                    `text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                    }`
                  }
                >
                  Promotions
                </NavLink>
                {userRole === 'admin' && (
                  <NavLink
                    to="/admin/approvals"
                    className={({ isActive }) =>
                      `text-white px-4 py-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
                      }`
                    }
                  >
                    Manage Students
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="text-white cursor-pointer bg-teal-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-800 shadow-md"
                >
                  Logout
                </button>
              </>
            )}

            {!token && (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="text-white bg-teal-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-800 shadow-md"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-white whitespace-nowrap bg-teal-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-800 shadow-md"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-teal-300 p-2 rounded-md transition-transform duration-300 ease-in-out"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="h-7 w-7 transform transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-teal-600 shadow-lg px-4 pb-6 h-[90vh] overflow-y-auto">
          {token ? (
            <>
              <NavLink to="/" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Dashboard
              </NavLink>
              <NavLink to="/fees" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Fees
              </NavLink>
              <NavLink to="/study-materials" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Study Materials
              </NavLink>
              <NavLink to="/attendance" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Attendance
              </NavLink>
              <NavLink to="/notifications" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Notifications
              </NavLink>
              <NavLink to="/reports" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Reports
              </NavLink>
              <NavLink to="/promotions" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Promotions
              </NavLink>
              <NavLink to="/admin/approvals" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Manage Students
              </NavLink>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="w-full mt-2 text-white bg-teal-700 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-800 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/home" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Home
              </NavLink>
              <NavLink to="/login" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Login
              </NavLink>
              <NavLink to="/signup" className={mobileLinkClass} onClick={() => { window.scrollTo(0, 0); toggleMenu(); }}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

// Helper class for mobile menu links
const mobileLinkClass = ({ isActive }) =>
  `block text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:bg-teal-700 ${isActive ? 'bg-teal-700 shadow-md' : ''
  }`;

export default Navbar;
