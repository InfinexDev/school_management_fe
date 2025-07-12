import React, { useState, useEffect } from 'react';
import { HiUpload, HiVideoCamera, HiPhotograph, HiDocumentText, HiX } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Promotions = () => {
  const [userRole] = useState(localStorage.getItem('userRole') || 'student');
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [modalContent, setModalContent] = useState(null);

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

  const openModal = (promotion) => {
    console.log('Opening modal for promotion:', { id: promotion.id, url: `${import.meta.env.VITE_REACT_APP_API_URL}${promotion.url}`, type: promotion.type });
    setModalContent(promotion);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const filteredPromotions = filterType === 'All' ? promotions : promotions.filter(p => p.type === filterType);

  const getModalStyle = (type) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: type === 'PDF' ? '95%' : '90%',
    maxWidth: type === 'PDF' ? 1200 : 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '12px',
    outline: 'none',
  });

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center drop-shadow-md">
            Explore Our School's Journey
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Discover our vibrant community, achievements, and opportunities. Join us today!
          </p>

          {userRole === 'admin' && (
            <div className="mb-12 bg-white p-8 rounded-2xl shadow-xl border border-teal-200">
              <h2 className="text-2xl font-bold mb-6">Upload Promotional Content</h2>
              <form onSubmit={handleUploadPromotion} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Content Type
                  </label>
                  <select
                    id="type"
                    className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
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
                    className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
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
                    className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
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
                    className="mt-1 w-full px-4 py-3 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    accept="video/mp4,image/jpeg,image/png,application/pdf"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="col-span-1 sm:col-span-2 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform shadow-md"
                >
                  <HiUpload className="h-5 w-5 inline mr-2" />
                  Upload Content
                </button>
              </form>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Highlights</h2>
            {promotions.length > 0 && (
              <div className="relative">
                <div className="flex overflow-x-auto space-x-4 pb-4">
                  {promotions.slice(0, 3).map((promotion) => (
                    <div
                      key={promotion.id}
                      className="flex-shrink-0 w-97 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300"
                      onClick={() => openModal(promotion)}
                    >
                      <div className="h-48 bg-gray-200">
                        {promotion.type === 'Image' && promotion.thumbnailUrl ? (
                          <img
                            src={`${import.meta.env.VITE_REACT_APP_API_URL}${promotion.thumbnailUrl}`}
                            alt={promotion.title}
                            className="w-full h-full object-cover"
                          />
                        ) : promotion.type === 'Video' && promotion.thumbnailUrl ? (
                          <video controls className="w-full h-full object-cover">
                            <source
                              src={`${import.meta.env.VITE_REACT_APP_API_URL}${promotion.url}`}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : promotion.type === 'PDF' && promotion.thumbnailUrl ? (
                          <iframe
                            src={`${import.meta.env.VITE_REACT_APP_API_URL}${promotion.thumbnailUrl}`}
                            className="w-full h-full object-cover"
                            title={promotion.title}
                          ></iframe>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            {promotion.type === 'Video' && <HiVideoCamera className="h-12 w-12 text-gray-500" />}
                            {promotion.type === 'Image' && <HiPhotograph className="h-12 w-12 text-gray-500" />}
                            {promotion.type === 'PDF' && <HiDocumentText className="h-12 w-12 text-gray-500" />}
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{promotion.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{promotion.description}</p>
                        <p className="text-xs text-gray-500 mt-2">Uploaded: {promotion.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-teal-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">All Promotional Content</h2>
              <div>
                <label htmlFor="filterType" className="text-sm font-medium text-gray-700 mr-2">
                  Filter by Type:
                </label>
                <select
                  id="filterType"
                  className="px-3 py-2 bg-gray-50 border outline-none border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Video">Video</option>
                  <option value="Image">Image</option>
                  <option value="PDF">PDF</option>
                </select>
              </div>
            </div>
            {isLoading ? (
              <div className="h-[60vh] flex items-center justify-center">
                <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
                  <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : filteredPromotions.length === 0 ? (
              <div className="text-center text-gray-600">No promotions available</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPromotions.map((promotion) => (
                  <div
                    key={promotion.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300"
                    onClick={() => openModal(promotion)}
                  >
                    <div className="h-48 bg-gray-200">
                      {promotion.type === 'Image' && promotion.thumbnailUrl ? (
                        <img
                          src={`${import.meta.env.VITE_REACT_APP_API_URL}${promotion.thumbnailUrl}`}
                          alt={promotion.title}
                          className="w-full h-full object-cover"
                        />
                      ) : promotion.type === 'Video' && promotion.thumbnailUrl ? (
                        <video controls className="w-full h-full object-cover">
                          <source
                            src={`${import.meta.env.VITE_REACT_APP_API_URL}${promotion.url}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : promotion.type === 'PDF' && promotion.thumbnailUrl ? (
                        <iframe
                          src={`${import.meta.env.VITE_REACT_APP_API_URL}${promotion.thumbnailUrl}`}
                          className="w-full h-full object-cover"
                          title={promotion.title}
                        ></iframe>
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          {promotion.type === 'Video' && <HiVideoCamera className="h-12 w-12 text-gray-500" />}
                          {promotion.type === 'Image' && <HiPhotograph className="h-12 w-12 text-gray-500" />}
                          {promotion.type === 'PDF' && <HiDocumentText className="h-12 w-12 text-gray-500" />}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{promotion.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{promotion.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500">Uploaded: {promotion.date}</p>
                        <p className="text-xs text-gray-500">By: {promotion.uploadedBy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="text-center mt-8">
              <a
                href="/home"
                className="inline-block bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform shadow-lg"
              >
                Apply Now for Admission!
              </a>
            </div>
          </div>

          <Modal
            open={!!modalContent}
            onClose={closeModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={getModalStyle(modalContent?.type)}>
              <IconButton
                onClick={closeModal}
                sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.600' }}
              >
                <CloseIcon />
              </IconButton>
              <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2, color: '#0f766e', fontWeight: 'bold' }}>
                {modalContent?.title}
              </Typography>
              {modalContent?.type === 'Video' && (
                <div>
                  <video
                    controls
                    style={{ width: '100%', height: '350px', borderRadius: '8px' }}
                    onError={(e) => console.error('Video load error:', e.target.error, 'URL:', `${import.meta.env.VITE_REACT_APP_API_URL}${modalContent.url}`)}
                  >
                    <source
                      src={`${import.meta.env.VITE_REACT_APP_API_URL}${modalContent.url}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag or the video failed to load.
                  </video>
                  <Typography variant="caption" sx={{ mt: 1, color: 'grey.500' }}>
                    Video URL:{' '}
                    <a
                      href={`${import.meta.env.VITE_REACT_APP_API_URL}${modalContent.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#0f766e', textDecoration: 'underline' }}
                    >
                      {`${import.meta.env.VITE_REACT_APP_API_URL}${modalContent.url}`}
                    </a>
                  </Typography>
                </div>
              )}
              {modalContent?.type === 'Image' && (
                <img
                  src={`${import.meta.env.VITE_REACT_APP_API_URL}${modalContent.url}`}
                  alt={modalContent.title}
                  style={{ width: '100%', height: '370px', objectFit: 'contain', borderRadius: '8px' }}
                  onError={(e) => console.error('Image load error:', e.target.src)}
                />
              )}
              {modalContent?.type === 'PDF' && (
                <iframe
                  src={`${import.meta.env.VITE_REACT_APP_API_URL}${modalContent.url}`}
                  style={{ width: '100%', height: '370px', borderRadius: '8px' }}
                  title={modalContent.title}
                />
              )}
              <Typography id="modal-description" sx={{ mt: 2, color: 'grey.600' }}>
                {modalContent?.description}
              </Typography>
              <Typography variant="caption" sx={{ mt: 1, color: 'grey.500' }}>
                Uploaded: {modalContent?.date} by {modalContent?.uploadedBy}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Promotions;