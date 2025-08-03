import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { HiChartBar, HiDocumentDownload } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';

const ReportTypes = {
  ACADEMIC: 'Academic',
  ATTENDANCE: 'Attendance',
  SUMMARY: 'Summary',
  LEAVE: 'Leave',
  GRADING: 'Grading',
};

const assessmentTypes = ['Unit Test', 'Mid Term', 'Final Exam'];
const terms = ['Term 1', 'Term 2', 'Annual'];
const gradeThresholds = [
  { grade: 'A', min: 85 },
  { grade: 'B', min: 70 },
  { grade: 'C', min: 55 },
  { grade: 'D', min: 40 },
  { grade: 'F', min: 0 },
];

const Reports = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'student');
  const [reportType, setReportType] = useState(ReportTypes.ACADEMIC);
  const [reports, setReports] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [subjectMarks, setSubjectMarks] = useState([{ subject: '', marks: '' }]);

  const classOptions = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
    'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12',
  ];

  const subjectOptions = [
    'Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science',
  ];

  const calculateGrade = (marks) => {
    for (const { grade, min } of gradeThresholds) {
      if (marks >= min) return grade;
    }
    return 'F';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsRes, studentsRes] = await Promise.all([
          axios.get(`/api/reports`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
          }),
          axios.get(`/api/users/students`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
          }),
        ]);

        setReports(reportsRes.data.reports);
        setStudentOptions(studentsRes.data.students);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load reports');
        toast.error(err.response?.data?.message || 'Error fetching data');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddSubject = () => {
    setSubjectMarks([...subjectMarks, { subject: '', marks: '' }]);
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedMarks = [...subjectMarks];
    updatedMarks[index][field] = value;
    setSubjectMarks(updatedMarks);
  };

  const handleRemoveSubject = (index) => {
    setSubjectMarks(subjectMarks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target); // Fixed typo: FormFormData -> FormData

    // Validate subjectMarks for Academic and Grading reports
    if (reportType === ReportTypes.ACADEMIC || reportType === ReportTypes.GRADING) {
      if (!subjectMarks.every(sm => sm.subject && sm.marks && sm.marks >= 0 && sm.marks <= 100)) {
        toast.error('Please fill all subject fields with valid marks (0-100)');
        return;
      }
    }

    const payload = {
      type: data.get('type'),
      studentId: data.get('student'),
      class: data.get('class'),
      subjectMarks:
        reportType === ReportTypes.ACADEMIC || reportType === ReportTypes.GRADING
          ? subjectMarks.map(sm => ({ subject: sm.subject, marks: parseInt(sm.marks) }))
          : null,
      attendance: data.get('attendance') || null,
      presentDays: data.get('presentDays') ? parseInt(data.get('presentDays')) : null,
      leaveDays: data.get('leaveDays') ? parseInt(data.get('leaveDays')) : null,
      leaveReason: data.get('leaveReason') || null,
      assessmentType: data.get('assessmentType') || null,
      term: data.get('term') || null,
      summaryNotes: data.get('summaryNotes') || null,
      overallGrade:
        reportType === ReportTypes.GRADING
          ? calculateGrade(
            subjectMarks.reduce((sum, sm) => sum + (parseInt(sm.marks) || 0), 0) / subjectMarks.length
          )
          : null,
    };

    // Basic payload validation
    if (!payload.type || !payload.studentId || !payload.class) {
      toast.error('Please fill all required fields: Report Type, Student, and Class');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/reports', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      setReports([...reports, res.data.report]);
      toast.success('Report created successfully');
      e.target.reset();
      setSubjectMarks([{ subject: '', marks: '' }]);
      setReportType(ReportTypes.ACADEMIC); // Reset report type
    } catch (err) {
      console.error('API call error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Error creating report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExport = async (id) => {
    try {
      const res = await axios.get(`/api/reports/export/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Report downloaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Export failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-10">Student Report Management</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-600 font-medium bg-red-100 p-4 rounded-lg">{error}</p>
        ) : (
          <>
            {(userRole === 'admin' || userRole === 'teacher') && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Report</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                    <select
                      name="type"
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                      required
                    >
                      {Object.values(ReportTypes).map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                    <select
                      name="student"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                      required
                    >
                      <option value="">Select Student</option>
                      {studentOptions.map((s) => (
                        <option key={s._id} value={s._id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <select
                      name="class"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                      required
                    >
                      <option value="">Select Class</option>
                      {classOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {(reportType === ReportTypes.ACADEMIC || reportType === ReportTypes.GRADING) && (
                    <>
                      {subjectMarks.map((sm, index) => (
                        <div key={index} className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <select
                              value={sm.subject}
                              onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                              required
                            >
                              <option value="">Select Subject</option>
                              {subjectOptions.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
                            <input
                              type="number"
                              value={sm.marks}
                              onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Enter Marks (0-100)"
                              min="0"
                              max="100"
                              required
                            />
                          </div>
                          {index > 0 && (
                            <div className="flex items-end">
                              <button
                                type="button"
                                onClick={() => handleRemoveSubject(index)}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="md:col-span-2">
                        <button
                          type="button"
                          onClick={handleAddSubject}
                          className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200"
                        >
                          Add Subject
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Type</label>
                        <select
                          name="assessmentType"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                          required
                        >
                          <option value="">Select Assessment Type</option>
                          {assessmentTypes.map((a) => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                        <select
                          name="term"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                          required
                        >
                          <option value="">Select Term</option>
                          {terms.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {reportType === ReportTypes.ATTENDANCE && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Attendance (%)</label>
                        <input
                          type="text"
                          name="attendance"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter Attendance % (e.g., 95%)"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Present Days</label>
                        <input
                          type="number"
                          name="presentDays"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter Present Days"
                          min="0"
                          required
                        />
                      </div>
                    </>
                  )}

                  {reportType === ReportTypes.LEAVE && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Leave Days</label>
                        <input
                          type="number"
                          name="leaveDays"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter Leave Days"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Leave Reason</label>
                        <input
                          type="text"
                          name="leaveReason"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter Leave Reason"
                          required
                        />
                      </div>
                    </>
                  )}

                  {reportType === ReportTypes.SUMMARY && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Summary Notes</label>
                      <textarea
                        name="summaryNotes"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter Summary Notes"
                        rows="4"
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-teal-600 cursor-pointer outline-none text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition duration-200 flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      <HiChartBar className="mr-2" />
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Report History</h2>
              {reports.length === 0 ? (
                <p className="text-gray-500 text-center">No reports found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full whitespace-nowrap text-sm text-left text-gray-700">
                    <thead className="text-xs uppercase bg-teal-50 text-gray-700">
                      <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Student</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Class</th>
                        <th className="px-6 py-3">Subject/Marks</th>
                        <th className="px-6 py-3">Overall Grade</th>
                        <th className="px-6 py-3">Attendance</th>
                        <th className="px-6 py-3">Present Days</th>
                        <th className="px-6 py-3">Leave Days</th>
                        <th className="px-6 py-3">Leave Reason</th>
                        <th className="px-6 py-3">Assessment</th>
                        <th className="px-6 py-3">Term</th>
                        <th className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((r) => (
                        <tr key={r.id} className="border-b hover:bg-teal-50 transition duration-150">
                          <td className="px-6 py-4">{new Date(r.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4">{r.student}</td>
                          <td className="px-6 py-4">{r.type}</td>
                          <td className="px-6 py-4">{r.class}</td>
                          <td className="px-6 py-4 align-top">
                            {r.subjectMarks && r.subjectMarks.length > 0 ? (
                              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                                {r.subjectMarks.map((sm, index) => (
                                  <span
                                    key={index}
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${sm.marks >= 85
                                        ? 'bg-green-100 text-green-800'
                                        : sm.marks >= 70
                                          ? 'bg-blue-100 text-blue-800'
                                          : sm.marks >= 55
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : sm.marks >= 40
                                              ? 'bg-orange-100 text-orange-800'
                                              : 'bg-red-100 text-red-800'
                                      }`}
                                  >
                                    {`${sm.subject}: ${sm.marks}`}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4">{r.overallGrade || '-'}</td>
                          <td className="px-6 py-4">{r.attendance || '-'}</td>
                          <td className="px-6 py-4">{r.presentDays || '-'}</td>
                          <td className="px-6 py-4">{r.leaveDays || '-'}</td>
                          <td className="px-6 py-4">{r.leaveReason || '-'}</td>
                          <td className="px-6 py-4">{r.assessmentType || '-'}</td>
                          <td className="px-6 py-4">{r.term || '-'}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleExport(r.id)}
                              className="flex items-center text-white p-2 rounded-lg bg-teal-600 cursor-pointer transition duration-150"
                            >
                              <HiDocumentDownload className="mr-1" /> Export
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
      <Footer />
    </div>
  );
};

export default Reports;