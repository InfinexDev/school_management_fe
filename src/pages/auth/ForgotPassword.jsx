import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal, Box } from '@mui/material';

const ForgotPassword = ({ isOpen, onClose }) => {
  const [forgotEmail, setForgotEmail] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Sending password reset email...');
    try {
      if (!forgotEmail) {
        throw new Error('Please enter your email.');
      }
      await axios.post('/api/auth/forgot-password', { email: forgotEmail });
      toast.success('Password reset email sent! Check your inbox.', {
        id: toastId,
        duration: 3000,
      });
      setForgotEmail('');
      setError('');
      onClose();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to send reset email.';
      toast.error(errorMessage, {
        id: toastId,
        duration: 3000,
      });
      setError(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
   <Modal
    open={isOpen}
    onClose={onClose}
    aria-labelledby="forgot-password-modal"
    aria-describedby="forgot-password-form"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '28rem',
        width: '100%',
        bgcolor: 'white',
        borderRadius: '0.75rem',
        boxShadow: 24,
        p: 6,
      }}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">Reset Password</h3>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="forgot-email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
            placeholder="Enter your email"
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 cursor-pointer text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 cursor-pointer text-white rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300"
          >
            Send Reset Link
          </button>
        </div>
      </form>
    </Box>
  </Modal>
  );
};

export default ForgotPassword;
