import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiUser, HiDocumentText, HiChartBar, HiBell, HiCheckCircle, HiUpload, HiPencilAlt, HiUserGroup, HiCurrencyDollar, HiSpeakerphone } from 'react-icons/hi';

const DashboardComponent = () => {
  const userRole = 'student'; // Can be 'student', 'teacher', or 'admin'

  const dashboardContent = {
    student: {
      title: 'Welcome, Student!',
      description: 'Your hub for assignments, progress tracking, and updates.',
      cards: [
        { title: 'My Profile', path: '/profile', icon: <HiUser className="h-10 w-10 text-teal-600" />, description: 'View and update your personal details.' },
        { title: 'Assignments', path: '/study-materials', icon: <HiDocumentText className="h-10 w-10 text-teal-600" />, description: 'Access your assignments and study materials.' },
        { title: 'Progress Reports', path: '/reports', icon: <HiChartBar className="h-10 w-10 text-teal-600" />, description: 'Track your academic performance.' },
        { title: 'Notifications', path: '/notifications', icon: <HiBell className="h-10 w-10 text-teal-600" />, description: 'Stay updated with alerts.' },
      ],
      stats: [
        { title: 'Pending Assignments', value: '5', progress: 60 },
        { title: 'Attendance Rate', value: '92%', progress: 92 },
        { title: 'Unread Notifications', value: '3', progress: 30 },
      ],
    },
    teacher: {
      title: 'Welcome, Teacher!',
      description: 'Manage your classes, assignments, and student records effortlessly.',
      cards: [
        { title: 'Mark Attendance', path: '/attendance', icon: <HiCheckCircle className="h-10 w-10 text-teal-600" />, description: 'Record student attendance digitally.' },
        { title: 'Upload Materials', path: '/study-materials', icon: <HiUpload className="h-10 w-10 text-teal-600" />, description: 'Share study materials and videos.' },
        { title: 'Grade Assignments', path: '/reports', icon: <HiPencilAlt className="h-10 w-10 text-teal-600" />, description: 'Evaluate student submissions.' },
        { title: 'Notifications', path: '/notifications', icon: <HiBell className="h-10 w-10 text-teal-600" />, description: 'Send and view notifications.' },
      ],
      stats: [
        { title: 'Classes Today', value: '3', progress: 75 },
        { title: 'Assignments to Grade', value: '10', progress: 50 },
        { title: 'Notifications Sent', value: '8', progress: 80 },
      ],
    },
    admin: {
      title: 'Welcome, Admin!',
      description: 'Oversee operations, manage fees, and promote your institution.',
      cards: [
        { title: 'Fee Structure', path: '/fees', icon: <HiCurrencyDollar className="h-10 w-10 text-teal-600" />, description: 'Configure and manage fees.' },
        { title: 'Manage Users', path: '/users', icon: <HiUserGroup className="h-10 w-10 text-teal-600" />, description: 'Add or edit user accounts.' },
        { title: 'Promotions', path: '/promotions', icon: <HiSpeakerphone className="h-10 w-10 text-teal-600" />, description: 'Share announcements and media.' },
        { title: 'Reports', path: '/reports', icon: <HiChartBar className="h-10 w-10 text-teal-600" />, description: 'Generate performance reports.' },
      ],
      stats: [
        { title: 'Total Users', value: '150', progress: 90 },
        { title: 'Fees Collected', value: '$5000', progress: 70 },
        { title: 'Active Promotions', value: '2', progress: 40 },
      ],
    },
  };

  const { title, description, cards, stats } = dashboardContent[userRole] || dashboardContent.student;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-teal-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-3 text-lg md:text-xl text-teal-100">{description}</p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, index) => (
            <NavLink
              key={index}
              to={card.path}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-4 mb-3">
                {card.icon}
                <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{card.description}</p>
            </NavLink>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h4 className="text-lg font-semibold text-gray-900">{stat.title}</h4>
              <p className="text-3xl font-bold text-teal-600 mt-2">{stat.value}</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity (Placeholder) */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <HiBell className="h-6 w-6 text-teal-600" />
              <p className="text-sm text-gray-600">New notification: Exam schedule released.</p>
            </li>
            <li className="flex items-center space-x-3">
              <HiDocumentText className="h-6 w-6 text-teal-600" />
              <p className="text-sm text-gray-600">Assignment submitted: Math Chapter 5.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;