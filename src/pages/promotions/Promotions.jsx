import React, { useState } from 'react';
import { HiUpload, HiVideoCamera, HiPhotograph, HiDocumentText } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';

const Promotions = () => {
  const [userRole] = useState('admin'); // Can be 'student', 'teacher', or 'admin'
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      type: 'Video',
      title: 'School Annual Event 2025',
      description: 'Highlights of our annual cultural event.',
      url: '#',
      uploadedBy: 'Admin',
      date: '2025-06-10',
    },
    {
      id: 2,
      type: 'PDF',
      title: 'Admission Brochure',
      description: 'Details for new student admissions.',
      url: '#',
      uploadedBy: 'Admin',
      date: '2025-06-09',
    },
  ]);

  const handleUploadPromotion = (e) => {
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

    setTimeout(() => {
      const newPromotion = {
        id: promotions.length + 1,
        type: e.target.type.value,
        title: e.target.title.value,
        description: e.target.description.value,
        url: '#', // Placeholder for actual file URL
        uploadedBy: 'Admin',
        date: new Date().toISOString().split('T')[0],
      };
      setPromotions([...promotions, newPromotion]);
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
    }, 2000);
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promotion.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{promotion.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promotion.uploadedBy}</td>
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

export default Promotions;
