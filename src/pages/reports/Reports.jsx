import React, { useState } from 'react';
import { HiDocumentDownload, HiChartBar } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';

const Reports = () => {
  const [userRole] = useState('admin'); // Can be 'student', 'teacher', or 'admin'
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'Academic',
      student: 'John Doe',
      class: 'Class 10',
      subject: 'Math',
      marks: 85,
      date: '2025-06-10',
    },
    {
      id: 2,
      type: 'Attendance',
      student: 'Jane Smith',
      class: 'Class 10',
      attendance: '90%',
      date: '2025-06-10',
    },
  ]);

  const handleGenerateReport = (e) => {
    e.preventDefault();
    const toastId = toast.loading('Generating report...');

    setTimeout(() => {
      const newReport = {
        id: reports.length + 1,
        type: e.target.type.value,
        student: e.target.student.value,
        class: e.target.class.value,
        subject: e.target.type.value === 'Academic' ? e.target.subject.value : '',
        marks: e.target.type.value === 'Academic' ? parseInt(e.target.marks.value) : '',
        attendance: e.target.type.value === 'Attendance' ? e.target.attendance.value : '',
        date: new Date().toISOString().split('T')[0],
      };
      setReports([...reports, newReport]);
      e.target.reset();
      toast.success('Report generated successfully!', {
        id: toastId,
        duration: 3000,
      });
    }, 1000);
  };

  const handleExportReport = (reportId) => {
    const toastId = toast.loading('Preparing report for export...');

    setTimeout(() => {
      toast.success('Report exported as PDF/Excel!', {
        id: toastId,
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Reports & Performance Tracking
          </h1>

          {(userRole === 'admin' || userRole === 'teacher') && (
            <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Report</h2>
              <form onSubmit={handleGenerateReport} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Report Type
                  </label>
                  <select
                    id="type"
                    className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                    required
                  >
                    <option value="Academic">Academic</option>
                    <option value="Attendance">Attendance</option>
                  </select>
                </div>
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
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject (for Academic)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                    placeholder="Enter subject (e.g., Math)"
                  />
                </div>
                <div>
                  <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
                    Marks (for Academic)
                  </label>
                  <input
                    type="number"
                    id="marks"
                    className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                    placeholder="Enter marks"
                  />
                </div>
                <div>
                  <label htmlFor="attendance" className="block text-sm font-medium text-gray-700">
                    Attendance % (for Attendance)
                  </label>
                  <input
                    type="text"
                    id="attendance"
                    className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                    placeholder="Enter attendance (e.g., 90%)"
                  />
                </div>
                <button
                  type="submit"
                  className="col-span-1 sm:col-span-2 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                >
                  <HiChartBar className="h-5 w-5 inline mr-2" />
                  Generate Report
                </button>
              </form>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Report History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.student}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.subject || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.marks || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.attendance || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleExportReport(report.id)}
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                        >
                          <HiDocumentDownload className="h-5 w-5 mr-2" />
                          Export
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reports;
