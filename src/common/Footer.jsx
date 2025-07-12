import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-teal-600 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
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
              <span className="text-2xl font-extrabold tracking-tight">
                PathSala
              </span>
            </div>
            <p className="text-sm font-medium">
              Empowering education with seamless management solutions for students, teachers, and administrators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block text-white hover:text-teal-200 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      isActive ? 'text-teal-200 font-semibold' : ''
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/fees"
                  className={({ isActive }) =>
                    `block text-white hover:text-teal-200 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      isActive ? 'text-teal-200 font-semibold' : ''
                    }`
                  }
                >
                  Fees
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/study-materials"
                  className={({ isActive }) =>
                    `block text-white hover:text-teal-200 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      isActive ? 'text-teal-200 font-semibold' : ''
                    }`
                  }
                >
                  Study Materials
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/attendance"
                  className={({ isActive }) =>
                    `block text-white hover:text-teal-200 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      isActive ? 'text-teal-200 font-semibold' : ''
                    }`
                  }
                >
                  Attendance
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    `block text-white hover:text-teal-200 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      isActive ? 'text-teal-200 font-semibold' : ''
                    }`
                  }
                >
                  Notifications
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@infinextechnologies.com"
                  className="hover:text-teal-200 transition-colors duration-300"
                >
                  Email: info@infinextechnologies.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919785228992"
                  className="hover:text-teal-200 transition-colors duration-300"
                >
                  Phone: +91 9785228992
                </a>
              </li>
              <li>
                <a
                  href="https://www.infinextechnologies.com"
                  className="hover:text-teal-200 transition-colors duration-300"
                >
                  Website: www.infinextechnologies.com
                </a>
              </li>
              <li className="flex space-x-4 mt-4">
                <a
                  href="https://facebook.com/infinextechnologies"
                  className="hover:text-teal-200 transition-transform duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/infinextechnologies"
                  className="hover:text-teal-200 transition-transform duration-300 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5C.5 2.119 1.61 1 2.98 1s2.48 1.119 2.48 2.5zM.5 7h5v16h-5V7zm7.982 0h4.965v2.078c.656-1.209 2.314-2.287 4.557-2.287 4.668 0 5.996 3.07 5.996 7.06v8.149h-5V14.06c0-1.872-.032-4.146-2.528-4.146-2.528 0-2.914 1.975-2.914 4.015v8.071h-5V7z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-teal-500 mt-8 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} PathSala. All rights reserved. |{' '}
            <a
              href="https://www.infinextechnologies.com"
              className="hover:text-teal-200 transition-colors duration-300"
            >
              Infinex Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;