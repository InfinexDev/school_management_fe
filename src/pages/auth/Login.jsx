import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { setAuthTokens } from '../../utils/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Processing login...');
        try {
            if (!email || !password) {
                throw new Error('Please fill in all fields.');
            }
            const response = await axios.post('/api/auth/login', { email, password });
            setAuthTokens({
                accessToken: response?.data?.accessToken,
                refreshToken: response?.data?.refreshToken,
            });
            localStorage.setItem('userRole', response?.data?.user?.role);
            toast.success('Login successful!', {
                id: toastId,
                duration: 3000,
            });
            navigate('/home');
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || 'Login failed.';
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
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Login to PathSala</h2>
                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                )}
                <div className="mb-6 text-center">
                    <p className="text-sm text-gray-600">
                        Access your student, teacher, or admin dashboard.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <NavLink to="/signup" className="text-teal-600 hover:text-teal-800 font-semibold">
                            Sign Up
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;