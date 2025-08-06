import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';

const StudentApprovals = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole');

  useEffect(() => {
    // Block non-admins
    if (role !== 'admin') {
      toast.error('Access denied: Admins only');
      navigate('/home');
      return;
    }
    fetchUnapprovedStudents();
  }, []);

  const fetchUnapprovedStudents = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('/api/auth/users/pending-students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data.students || []);
    } catch (err) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const approveStudent = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`/api/auth/users/approve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Student approved');
      setStudents((prev) => prev.filter((student) => student.id !== id));
      await fetchUnapprovedStudents();
    } catch (err) {
      toast.error('Approval failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Pending Student Approvals
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-16 bg-gray-100 rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-6h6v6m-6 0h6m4 0h-4m-6 0H5m4-6V5h6v6m4 6h2m-2-6h2M5 11H3m2 6H3"
                />
              </svg>
              <p className="mt-3 text-lg text-gray-500">No pending approvals</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y whitespace-nowrap divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Parent Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students?.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-blue-50 transition duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.class || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.parentEmail || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.phone || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.address || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(student.createdAt).toLocaleDateString() || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => approveStudent(student.id)}
                          className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentApprovals;