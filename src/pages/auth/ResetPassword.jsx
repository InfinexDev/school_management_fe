import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Resetting password...');
    try {
      if (!password) {
        throw new Error('Please enter a new password.');
      }
      await axios.post('/api/auth/reset-password', { token, password });
      toast.success('Password reset successfully! Please log in.', {
        id: toastId,
        duration: 3000,
      });
      setPassword('');
      setError('');
      navigate('/login');
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to reset password.';
      toast.error(errorMessage, {
        id: toastId,
        duration: 3000,
      });
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Reset Your Password</h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        <form onSubmit={handleResetPassword}>
          <div className="relative mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300 pr-12"
              placeholder="Enter new password"
              required
            />
            <span
              className="absolute right-4 top-10 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Back to{' '}
            <a href="/login" className="text-teal-600 hover:text-teal-800 font-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;