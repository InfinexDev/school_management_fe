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

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    console.log('User Role:', storedRole);
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
        const response = await axios.get('/api/attendance', {
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
        const response = await axios.get('/api/attendance/leave-requests', {
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
        '/api/attendance/mark',
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
        '/api/attendance/leave-request',
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

  // Update handleApproveLeave
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
        `/api/attendance/leave-request/${leaveId}/approve`,
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
            <div className="text-center">
              <p className="text-lg text-gray-600">Loading...</p>
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
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {students.map((student) => (
                            <tr key={student.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.status}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                  onClick={() => handleMarkAttendance(student.id, 'Present')}
                                  className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold flex items-center mr-4"
                                >
                                  <HiCheckCircle className="h-5 w-5 mr-1" />
                                  Present
                                </button>
                                <button
                                  onClick={() => handleMarkAttendance(student.id, 'Absent')}
                                  className="text-red-600 cursor-pointer hover:text-red-800 font-semibold flex items-center"
                                >
                                  <HiXCircle className="h-5 w-5 mr-1" />
                                  Absent
                                </button>
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
                      <input
                        type="text"
                        id="student"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        placeholder="Enter student name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                        Class
                      </label>
                      <input
                        type="text"
                        id="class"
                        className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        placeholder="Enter class (e.g., Class 10)"
                        required
                      />
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
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {leaveRequests.map((leave) => (
                            <tr key={leave.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.student}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.class}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.reason}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.from}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.to}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.status}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {leave.status === 'Pending' && (
                                  <button
                                    onClick={() => handleApproveLeave(leave.id)}
                                    className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold flex items-center"
                                  >
                                    <HiCheckCircle className="h-5 w-5 mr-1" />
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
