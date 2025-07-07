import React, { useState, useEffect } from 'react';
import { HiUpload, HiVideoCamera, HiPhotograph, HiDocumentText } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';

const Promotions = () => {
  const [userRole] = useState(localStorage.getItem('userRole') || 'student');
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('/api/promotions', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        });
        console.log('Promotions Response:', JSON.stringify(response.data, null, 2));
        setPromotions(response?.data?.promotions || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch promotions error:', error);
        console.error('Error response:', JSON.stringify(error.response?.data, null, 2));
        setError('Failed to fetch promotions. Please try again later.');
        toast.error(error.response?.data?.message || 'Failed to fetch promotions', {
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

    fetchPromotions();
  }, []);

  const handleUploadPromotion = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Uploading promotional content...', {
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
      formData.append('type', e.target.type.value);
      formData.append('title', e.target.title.value);
      formData.append('description', e.target.description.value);
      formData.append('file', e.target.file.files[0]);

      const response = await axios.post('/api/promotions', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setPromotions([...promotions, response.data.promotion]);
      e.target.reset();
      toast.success('Promotional content uploaded successfully!', {
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
      console.error('Upload promotion error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload promotion', {
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
            Brand Promotions & Multimedia
          </h1>

          {userRole === 'admin' && (
            <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Promotional Content</h2>
              <form onSubmit={handleUploadPromotion} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Content Type
                  </label>
                  <select
                    id="type"
                    className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                    required
                  >
                    <option value="Video">Video</option>
                    <option value="Image">Image</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                    placeholder="Enter content title"
                    required
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="mt-1 w-full px-4 py-4 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                    placeholder="Enter content description"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    Upload File
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                    accept="video/mp4,image/jpeg,image/png,application/pdf"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="col-span-1 sm:col-span-2 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                >
                  <HiUpload className="h-5 w-5 inline mr-2" />
                  Upload Content
                </button>
              </form>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Promotional Content</h2>
            {isLoading ? (
              <div className="text-center text-gray-600">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : promotions.length === 0 ? (
              <div className="text-center text-gray-600">No promotions available</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {promotions.map((promotion) => (
                      <tr key={promotion.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promotion.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {promotion.type === 'Video' && <HiVideoCamera className="h-5 w-5 text-teal-600 inline mr-2" />}
                          {promotion.type === 'Image' && <HiPhotograph className="h-5 w-5 text-teal-600 inline mr-2" />}
                          {promotion.type === 'PDF' && <HiDocumentText className="h-5 w-5 text-teal-600 inline mr-2" />}
                          {promotion.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <a href={promotion.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                            {promotion.title}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{promotion.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promotion.uploadedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Promotions;