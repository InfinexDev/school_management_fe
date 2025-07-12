import React, { useEffect, useState } from 'react';
import { HiDocumentText, HiVideoCamera, HiDownload, HiUpload } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import axios from 'axios';

const StudyMaterials = () => {
  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12'
  ];
  const subjects = [
    'Mathematics', 'Science', 'English', 'Social Studies',
    'Hindi', 'Physics', 'Chemistry', 'Biology', 'History',
    'Geography', 'Computer Science'
  ];

  const [userRole, setUserRole] = useState('teacher'); // Adjust based on auth context
  const [materials, setMaterials] = useState([]);
  const [scheduledTopics, setScheduledTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Update userRole state using role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    } else {
      setError('User role not found');
      toast.error('Please log in to access study materials', {
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
  }, []);
  // Fetch materials and topics on component mount
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('/api/study-materials', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setMaterials(response.data.materials || []);
      } catch (error) {
        console.error('Fetch materials error:', error);
        setError('Failed to fetch study materials. Please try again later.');
        toast.error(error.response?.data?.message || 'Failed to fetch study materials', {
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

    const fetchTopics = async () => {
      try {
        const response = await axios.get('/api/study-materials/scheduled-topics', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setScheduledTopics(response.data.topics || []);
      } catch (error) {
        console.error('Fetch topics error:', error);
        setError('Failed to fetch scheduled topics. Please try again later.');
        toast.error(error.response?.data?.message || 'Failed to fetch scheduled topics', {
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
      await Promise.all([fetchMaterials(), fetchTopics()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Handle upload material
  const handleUploadMaterial = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Uploading study material...', {
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
      const formData = new FormData();
      formData.append('class', e.target.class.value);
      formData.append('subject', e.target.subject.value);
      formData.append('type', e.target.type.value);
      formData.append('title', e.target.title.value);
      formData.append('file', e.target.file.files[0]);

      const response = await axios.post('/api/study-materials/upload', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMaterials([...materials, response.data.material]);
      e.target.reset();
      toast.success(response.data.message, {
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
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload material', {
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

  // Handle schedule topic
  const handleScheduleTopic = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Scheduling topic...', {
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
        '/api/study-materials/schedule-topic',
        {
          class: e.target.class.value,
          subject: e.target.subject.value,
          topic: e.target.topic.value,
          date: e.target.date.value,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setScheduledTopics([...scheduledTopics, response.data.topic]);
      e.target.reset();
      toast.success(response.data.message, {
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
      console.error('Schedule topic error:', error);
      toast.error(error.response?.data?.message || 'Failed to schedule topic', {
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

  // Handle download
  const handleDownload = async (materialId) => {
    const toastId = toast.loading('Downloading material...', {
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
      const response = await axios.get(`/api/study-materials/download/${materialId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `material-${materialId}${response.headers['content-type'].includes('pdf') ? '.pdf' : '.mp4'}`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success('Material downloaded successfully!', {
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
        duration: 2000,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast.error(error.response?.data?.message || 'Failed to download material', {
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
            Study Materials
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
                <>
                  <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Study Material</h2>
                    <form onSubmit={handleUploadMaterial} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                          Class
                        </label>
                        <select
                          id="class"
                          name="class"
                          className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                          required
                        >
                          <option value="" disabled selected>Select class</option>
                          {classes.map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                          required
                        >
                          <option value="" disabled selected>Select subject</option>
                          {subjects.map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                          Material Type
                        </label>
                        <select
                          id="type"
                          name="type"
                          className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                          required
                        >
                          <option value="PDF">PDF</option>
                          <option value="Video">Video</option>
                          <option value="Assignment">Assignment</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                          placeholder="Enter material title"
                          required
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                          Upload File
                        </label>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          accept=".pdf,.mp4"
                          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="col-span-1 sm:col-span-2 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                      >
                        <HiUpload className="h-5 w-5 inline mr-2" />
                        Upload Material
                      </button>
                    </form>
                  </div>

                  <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule Daily Topic</h2>
                    <form onSubmit={handleScheduleTopic} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                          Class
                        </label>
                        <select
                          id="class"
                          name="class"
                          className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                          required
                        >
                          <option value="" disabled selected>Select class</option>
                          {classes.map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                          required
                        >
                          <option value="" disabled selected>Select subject</option>
                          {subjects.map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                          Topic
                        </label>
                        <input
                          type="text"
                          id="topic"
                          name="topic"
                          className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                          placeholder="Enter topic (e.g., Quadratic Equations)"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          Schedule Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="col-span-1 sm:col-span-2 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                      >
                        Schedule Topic
                      </button>
                    </form>
                  </div>
                </>
              )}

              <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Study Materials</h2>
                {materials.length === 0 ? (
                  <div className="text-center text-gray-600 py-4">
                    No study materials found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {materials.map((material) => (
                          <tr key={material.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.class}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.subject}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {material.type === 'PDF' ? (
                                <HiDocumentText className="h-5 w-5 text-teal-600 inline" />
                              ) : (
                                <HiVideoCamera className="h-5 w-5 text-teal-600 inline" />
                              )}
                              <span className="ml-2">{material.type}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.uploadedBy}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => handleDownload(material.id)}
                                className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold flex items-center"
                              >
                                <HiDownload className="h-5 w-5 mr-1" />
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Scheduled Daily Topics</h2>
                {scheduledTopics.length === 0 ? (
                  <div className="text-center text-gray-600 py-4">
                    No scheduled topics found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {scheduledTopics.map((topic) => (
                          <tr key={topic.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{topic.class}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{topic.subject}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{topic.topic}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{topic.date}</td>
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

export default StudyMaterials;