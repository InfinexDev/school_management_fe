import React, { useEffect, useState } from 'react';
import { HiBell, HiPaperAirplane } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';

const Notifications = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'student'); // Dynamic userRole
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setNotifications(response?.data?.notifications || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch notifications error:', error);
        setError('Failed to fetch notifications. Please try again later.');
        toast.error(error.response?.data?.message || 'Failed to fetch notifications', {
          style: {
            background: '#ef4444',
            color: '#ffffff',
            fontWeight: '600',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          duration: 4000,
        });
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleSendNotification = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Sending notification...', {
      style: {
        background: '#0f766e',
        color: '#ffffff',
        fontWeight: '600',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      iconTheme: { primary: '#ffffff', secondary: '#0f766e' },
    });

    try {
      const response = await axios.post(
        '/api/notifications',
        {
          type: e.target.type.value,
          subject: e.target.subject.value,
          message: e.target.message.value,
          recipients: e.target.recipients.value,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setNotifications([...notifications, response.data.notification]);
      e.target.reset();
      toast.success('Notification sent successfully!', {
        id: toastId,
        style: {
          background: '#0f766e',
          color: '#ffffff',
          fontWeight: '600',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        iconTheme: { primary: '#ffffff', secondary: '#0f766e' },
        duration: 3000,
      });
    } catch (error) {
      console.error('Send notification error:', error);
      toast.error(error.response?.data?.message || 'Failed to send notification', {
        id: toastId,
        style: {
          background: '#ef4444',
          color: '#ffffff',
          fontWeight: '600',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        duration: 4000,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Notifications & Communication
          </h1>

          {isLoading ? (
            <div className="text-center">
              <p className="text-lg text-gray-600">Loading...</p>
            </div>
          ) : error ? (
            <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <p>{error}</p>
            </div>
          ) : (
            <>
              {(userRole === 'admin' || userRole === 'teacher') && (
                <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Notification</h2>
                  <form onSubmit={handleSendNotification} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Notification Type
                      </label>
                      <select
                        id="type"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        required
                      >
                        <option value="SMS">SMS</option>
                        <option value="Email">Email</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        placeholder="Enter subject (e.g., Exam Schedule)"
                        required
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="mt-1 w-full px-4 py-4 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        placeholder="Enter notification message"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label htmlFor="recipients" className="block text-sm font-medium text-gray-700">
                        Recipients
                      </label>
                      <input
                        type="text"
                        id="recipients"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        placeholder="Enter recipients (e.g., Class 10, John Doe)"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="col-span-1 sm:col-span-2 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                    >
                      <HiPaperAirplane className="h-5 w-5 inline mr-2" />
                      Send Notification
                    </button>
                  </form>
                </div>
              )}

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Notification History</h2>
                {notifications.length === 0 ? (
                  <div className="text-center text-gray-600 py-4">
                    No notifications found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent By</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {notifications.map((notification) => (
                          <tr key={notification.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <HiBell className="h-5 w-5 text-teal-600 inline mr-2" />
                              {notification.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.subject}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{notification.message}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.recipients}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notification.sentBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
