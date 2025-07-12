import React, { useEffect, useState } from 'react';
import { HiDocumentDownload, HiChartBar } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';

const Reports = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'student');
  const [reportType, setReportType] = useState('Academic');
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [classOptions] = useState([
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
    'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12',
  ]);
  const [subjectOptions] = useState([
    'Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science',
  ]);
  const [studentOptions, setStudentOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const requests = [
          axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/reports`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
          }),
          axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/students`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
          }),
        ];

        const responses = await Promise.all(requests);
        const [reportsResponse, studentsResponse] = responses;

        console.log('Reports Response:', JSON.stringify(reportsResponse.data, null, 2));
        console.log('Students Response:', JSON.stringify(studentsResponse.data, null, 2));
        setReports(reportsResponse?.data?.reports || []);
        setStudentOptions(studentsResponse?.data?.students || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch data error:', error);
        console.error('Error response:', JSON.stringify(error.response?.data, null, 2));
        setError('Failed to fetch data. Please try again later.');
        toast.error(error.response?.data?.message || 'Failed to fetch data', {
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

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedReports = [...reports].sort((a, b) => {
      if (key === 'marks') {
        return direction === 'asc' ? (a[key] || 0) - (b[key] || 0) : (b[key] || 0) - (a[key] || 0);
      }
      if (key === 'date') {
        return direction === 'asc'
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      return direction === 'asc'
        ? (a[key] || '').localeCompare(b[key] || '')
        : (b[key] || '').localeCompare(a[key] || '');
    });
    setReports(sortedReports);
  };

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    const type = e.target.type.value;
    const studentId = e.target.student.value;
    const className = e.target.class.value;
    const subject = type === 'Academic' ? e.target.subject.value : '';
    const marks = type === 'Academic' ? parseInt(e.target.marks.value) : '';
    const attendance = type === 'Attendance' ? e.target.attendance.value : '';

    if (type === 'Academic' && (!subject || !marks)) {
      toast.error('Subject and marks are required for Academic reports', {
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
      return;
    }
    if (type === 'Attendance' && !attendance) {
      toast.error('Attendance is required for Attendance reports', {
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
      return;
    }

    const student = studentOptions.find(s => s._id === studentId)?.name || 'Unknown';
    const confirmAdd = window.confirm(
      `Generate ${type} report for ${student} in ${className}?`
    );
    if (!confirmAdd) {
      return;
    }

    setIsFormLoading(true);
    const toastId = toast.loading('Generating report...', {
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/reports`,
        {
          type,
          studentId,
          class: className,
          subject,
          marks,
          attendance,
        },
        {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        }
      );
      setReports([...reports, response.data.report]);
      e.target.reset();
      toast.success('Report generated successfully!', {
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
      console.error('Generate report error:', error);
      toast.error(error.response?.data?.message || 'Failed to generate report', {
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
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleExportReport = async (reportId) => {
    const toastId = toast.loading('Preparing report for export...', {
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
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/reports/export/${reportId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Report exported as PDF!', {
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
      console.error('Export report error:', error);
      toast.error(error.response?.data?.message || 'Failed to export report', {
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
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center drop-shadow-md">
            Reports & Performance Tracking
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
            <div className="text-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md">
              <p className="text-lg">{error}</p>
            </div>
          ) : (
            <>
              {(userRole === 'admin' || userRole === 'teacher') && (
                <div className="mb-12 bg-white p-8 rounded-2xl shadow-xl border border-teal-100">
                  <h2 className="text-2xl font-bold mb-6">Generate Report</h2>
                  <form onSubmit={handleGenerateReport} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Report Type
                      </label>
                      <select
                        id="type"
                        className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                        required
                        disabled={isFormLoading}
                        onChange={(e) => setReportType(e.target.value)}
                      >
                        <option value="Academic">Academic</option>
                        <option value="Attendance">Attendance</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                        Student Name
                      </label>
                      <select
                        id="student"
                        className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                        required
                        disabled={isFormLoading}
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
                        className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                        required
                        disabled={isFormLoading}
                      >
                        <option value="">Select Class</option>
                        {classOptions.map((className) => (
                          <option key={className} value={className}>
                            {className}
                          </option>
                        ))}
                      </select>
                    </div>
                    {reportType === 'Academic' && (
                      <>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject
                          </label>
                          <select
                            id="subject"
                            className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                            required
                            disabled={isFormLoading}
                          >
                            <option value="">Select Subject</option>
                            {subjectOptions.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
                            Marks
                          </label>
                          <input
                            type="number"
                            id="marks"
                            className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                            placeholder="Enter marks"
                            min="0"
                            max="100"
                            required
                            disabled={isFormLoading}
                          />
                        </div>
                      </>
                    )}
                    {reportType === 'Attendance' && (
                      <div>
                        <label htmlFor="attendance" className="block text-sm font-medium text-gray-700">
                          Attendance %
                        </label>
                        <input
                          type="text"
                          id="attendance"
                          className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                          placeholder="Enter attendance (e.g., 90%)"
                          required
                          disabled={isFormLoading}
                        />
                      </div>
                    )}
                    <button
                      type="submit"
                      className={`col-span-1 sm:col-span-2 cursor-pointer bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform shadow-md ${isFormLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      disabled={isFormLoading}
                    >
                      <HiChartBar className="h-5 w-5 inline mr-2" />
                      {isFormLoading ? 'Generating...' : 'Generate Report'}
                    </button>
                  </form>
                </div>
              )}

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-teal-100">
                <h2 className="text-2xl font-bold  mb-6">Report History</h2>
                {reports.length === 0 ? (
                  <div className="text-center text-gray-600 py-6">
                    No reports found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden">
                      <thead className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
                        <tr>
                          {[
                            { label: 'Date', key: 'date' },
                            { label: 'Type', key: 'type' },
                            { label: 'Student', key: 'student' },
                            { label: 'Class', key: 'class' },
                            { label: 'Subject', key: 'subject' },
                            { label: 'Marks', key: 'marks' },
                            { label: 'Attendance', key: 'attendance' }
                          ].map(({ label, key }) => (
                            <th
                              key={key}
                              className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider cursor-pointer"
                              onClick={() => sortData(key)}
                            >
                              {label} {sortConfig.key === key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                          ))}
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100 bg-white">
                        {reports.map((report) => (
                          <tr key={report.id} className="hover:bg-teal-50 transition-all duration-200">
                            <td className="px-6 py-4 text-sm text-gray-800 font-medium">{formatDate(report.date)}</td>

                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm
              ${report.type === 'Academic'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-purple-100 text-purple-800'
                                  }`}
                              >
                                {report.type}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-700">{report.student}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{report.class}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {report.type === 'Academic' ? report.subject || '-' : '-'}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {report.type === 'Academic' ? report.marks || '-' : '-'}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {report.type === 'Attendance' ? report.attendance || '-' : '-'}
                            </td>

                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleExportReport(report.id)}
                                className="inline-flex items-center bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-bold px-4 py-2 rounded-md shadow-md hover:scale-102 cursor-pointer hover:shadow-lg transition-all duration-300"
                              >
                                <HiDocumentDownload className="w-5 h-5 mr-2" />
                                Export
                              </button>
                            </td>
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

export default Reports;