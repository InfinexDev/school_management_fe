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
  const [subjects] = useState([
    'Exam Schedule',
    'Holiday Notice',
    'Fee Reminder',
    'Parent-Teacher Meeting',
    'General Announcement',
  ]);
  const [recipientOptions] = useState([
    'All Students',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
    'Class 11',
    'Class 12',
    'All Teachers',
    'All Parents',
  ]);

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
            <div className='h-[60vh] flex items-center justify-center'>
              <div
                class="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
              >
                <span
                  class="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
                >
                </span>
              </div>
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
                      <select
                        id="subject"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        required
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
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
                      <select
                        id="recipients"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        required
                      >
                        <option value="">Select Recipients</option>
                        {recipientOptions.map((recipient) => (
                          <option key={recipient} value={recipient}>
                            {recipient}
                          </option>
                        ))}
                      </select>
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
                    <table className="min-w-full bg-white shadow-xl rounded-xl overflow-hidden">
                      <thead className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Type</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Message</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Recipients</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Sent By</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {notifications.map((notification) => (
                          <tr key={notification.id} className="hover:bg-gray-50 transition-all duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs font-semibold">
                                {notification.date}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium flex items-center gap-2">
                              <HiBell className="text-teal-600 h-5 w-5" />
                              <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                                {notification.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{notification.subject}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{notification.message}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                {notification.recipients}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{notification.sentBy}</td>
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
