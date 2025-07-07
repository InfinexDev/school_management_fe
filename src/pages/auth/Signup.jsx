import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthTokens } from '../../utils/auth';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [className, setClassName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Processing signup...');
        try {
            if (!name || !email || !password || !role || (role === 'student' && !className)) {
                throw new Error('Please fill in all required fields.');
            }
            const response = await axios.post('/api/auth/register', {
                name,
                email,
                password,
                role,
                phone,
                address,
                class: className,
            });
            setAuthTokens({
                accessToken: response?.data?.accessToken,
                refreshToken: response?.data?.refreshToken,
            });
            // localStorage.setItem('userRole', role);
            toast.success('Signup successful!', {
                id: toastId,
                duration: 3000,
            });
            navigate('/login');
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || 'Signup failed.';
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
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Sign Up for EduManage</h2>
                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                )}
                <div className="mb-6 text-center">
                    <p className="text-sm text-gray-600">
                        Create an account as a student, teacher, admin, or parent.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
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
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                            placeholder="Enter your address"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 cursor-pointer w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            {/* <option value="admin">Admin</option> */}
                            {/* <option value="parent">Parent</option> */}
                        </select>
                    </div>
                    <div className="mb-4">
                        {role === 'student' && (
                            <>
                                <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                                    Class
                                </label>
                                <select
                                    id="class"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                    className="mt-1 cursor-pointer w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                    required
                                >
                                    <option value="">Select Class</option>
                                    <option value="Class 1">Class 1</option>
                                    <option value="Class 2">Class 2</option>
                                    <option value="Class 3">Class 3</option>
                                    <option value="Class 4">Class 4</option>
                                    <option value="Class 5">Class 5</option>
                                    <option value="Class 6">Class 6</option>
                                    <option value="Class 7">Class 7</option>
                                    <option value="Class 8">Class 8</option>
                                    <option value="Class 9">Class 9</option>
                                    <option value="Class 10">Class 10</option>
                                    <option value="Class 11">Class 11</option>
                                    <option value="Class 12">Class 12</option>
                                </select>
                            </>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <NavLink to="/login" className="text-teal-600 hover:text-teal-800 font-semibold">
                            Login
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;