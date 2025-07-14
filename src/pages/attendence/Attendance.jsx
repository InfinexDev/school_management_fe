import React, { useEffect, useState } from 'react';
import { HiCheckCircle, HiXCircle, HiDocumentText } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';

const Attendance = () => {
  const [userRole, setUserRole] = useState('student'); // Can be 'student', 'teacher', or 'admin'
  // Add state for loading and error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [classOptions] = useState([
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
  ]);

  useEffect(() => {
    const fetchStudentOptions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/students`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setStudentOptions(response?.data?.students || []);
      } catch (error) {
        console.error('Fetch students error:', error);
        toast.error('Failed to fetch students for dropdown', {
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

    fetchStudentOptions();
  }, []);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    } else {
      setError('User role not found');
      toast.error('Please log in to access attendance', {
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

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/attendance`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        console.log('Students Data:', response?.data?.attendance);
        setStudents(response?.data?.attendance || []);
      } catch (error) {
        console.error('Fetch attendance error:', error);
        setError('Failed to fetch attendance data. Please try again later.');
        toast.error(error.response?.data?.message || 'Failed to fetch attendance data', {
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

    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/attendance/leave-requests`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setLeaveRequests(response.data.leaveRequests || []);
      } catch (error) {
        console.error('Fetch leave requests error:', error);
        setError('Failed to fetch leave requests. Please try again later.');
        toast.error(error.response?.data?.message || 'Failed to fetch leave requests', {
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

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchStudents(), fetchLeaveRequests()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Update handleMarkAttendance
  const handleMarkAttendance = async (studentId, status) => {
    console.log('Marking attendance for:', { studentId, status });
    const toastId = toast.loading('Updating attendance...', {
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/attendance/mark`,
        { studentId, status },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setStudents(
        students.map((student) =>
          student.id === studentId ? { ...student, status } : student
        )
      );
      toast.success(`Attendance marked as ${status}!`, {
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
      if (status === 'Absent') {
        toast('Notification sent to student/parent for absence', {
          style: {
            background: '#0f766e',
            color: '#ffffff',
            fontWeight: '600',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Mark attendance error:', error);
      toast.error(error.response?.data?.message || 'Failed to mark attendance', {
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

  // Update handleSubmitLeave
  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Submitting leave request...', {
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/attendance/leave-request`,
        {
          student: e.target.student.value,
          class: e.target.class.value,
          reason: e.target.reason.value,
          from: e.target.from.value,
          to: e.target.to.value,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setLeaveRequests([...leaveRequests, response.data.leaveRequest]);
      e.target.reset();
      toast.success('Leave request submitted successfully!', {
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
      console.error('Submit leave request error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit leave request', {
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

  // Update handleApproveLeave to use VITE_REACT_APP_API_URL
  const handleApproveLeave = async (leaveId) => {
    const toastId = toast.loading('Processing leave request...', {
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
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/attendance/leave-request/${leaveId}/approve`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setLeaveRequests(
        leaveRequests.map((leave) =>
          leave.id === leaveId ? { ...leave, status: 'Approved' } : leave
        )
      );
      toast.success('Leave request approved!', {
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
      console.error('Approve leave error:', error);
      toast.error(error.response?.data?.message || 'Failed to approve leave request', {
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
            Attendance & Leave Management
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
              {(userRole === 'teacher' || userRole === 'admin') && (
                <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Mark Attendance</h2>
                  {students?.length === 0 ? (
                    <div className="text-center text-gray-600 py-4">
                      No students found.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white shadow-xl rounded-xl overflow-hidden">
                        <thead className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Student</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Class</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{student.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.class}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${student.status === 'Present'
                                    ? 'bg-green-100 text-green-700'
                                    : student.status === 'Absent'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                  {student.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {student.status === 'Not Marked' ? (
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleMarkAttendance(student.id, 'Present')}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white bg-green-500 hover:bg-green-600 shadow-md transition-all duration-300 transform hover:scale-102 cursor-pointer"
                                    >
                                      <HiCheckCircle className="h-5 w-5" />
                                      Present
                                    </button>
                                    <button
                                      onClick={() => handleMarkAttendance(student.id, 'Absent')}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 shadow-md transition-all duration-300 transform hover:scale-102 cursor-pointer"
                                    >
                                      <HiXCircle className="h-5 w-5" />
                                      Absent
                                    </button>
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold border border-gray-300 shadow-sm">
                                    ✅ Already Marked
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </div>
                  )}
                </div>
              )}

              {(userRole === 'student') && (
                <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit Leave Request</h2>
                  <form onSubmit={handleSubmitLeave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                        Student Name
                      </label>
                      <select
                        id="student"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        required
                      >
                        <option value="">Select Student</option>
                        {studentOptions.map((student) => (
                          <option key={student._id} value={student._id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                        Class
                      </label>
                      <select
                        id="class"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        required
                      >
                        <option value="">Select Class</option>
                        {classOptions.map((className) => (
                          <option key={className} value={className}>
                            {className}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                        Reason
                      </label>
                      <input
                        type="text"
                        id="reason"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        placeholder="Enter reason for leave"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                        From Date
                      </label>
                      <input
                        type="date"
                        id="from"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                        To Date
                      </label>
                      <input
                        type="date"
                        id="to"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="col-span-1 sm:col-span-2 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                    >
                      <HiDocumentText className="h-5 w-5 inline mr-2" />
                      Submit Leave
                    </button>
                  </form>
                </div>
              )}

              {(userRole === 'teacher' || userRole === 'admin') && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Leave Requests</h2>
                  {leaveRequests.length === 0 ? (
                    <div className="text-center text-gray-600 py-4">
                      No leave requests found.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white shadow-xl rounded-xl overflow-hidden">
                        <thead className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Student</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Class</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Reason</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">From</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">To</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {leaveRequests.map((leave) => (
                            <tr key={leave.id} className="hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{leave.student}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{leave.class}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{leave.reason}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{leave.from}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{leave.to}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${leave.status === 'Approved'
                                      ? 'bg-green-100 text-green-700'
                                      : leave.status === 'Pending'
                                        ? 'bg-yellow-100 text-yellow-700 animate-pulse'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                  {leave.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {leave.status === 'Pending' && (
                                  <button
                                    onClick={() => handleApproveLeave(leave.id)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-all duration-300 transform hover:scale-105"
                                  >
                                    <HiCheckCircle className="h-5 w-5" />
                                    Approve
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;
