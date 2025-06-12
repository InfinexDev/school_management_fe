import { useState } from 'react';
import { HiUser, HiPencilAlt, HiCheckCircle, HiMail, HiPhone } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        rollNumber: 'ST12345',
        class: '10th Grade',
        address: '123, Main Street, City, Country',
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const toastId = toast.loading('Saving profile...');
        if (userData.name && userData.email && userData.phone && userData.address) {
            setTimeout(() => {
                toast.success('Profile updated successfully!', {
                    id: toastId,
                    duration: 3000,
                });
                setIsEditing(false);
            }, 2000);
        } else {
            toast.error('Please fill in all fields.', {
                id: toastId,
                duration: 3000,
            });
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <HiUser className="h-12 w-12 text-teal-600" />
                            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        </div>
                        <button
                            onClick={handleEditToggle}
                            className="flex cursor-pointer items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                        >
                            <HiPencilAlt className="h-5 w-5" />
                            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full p-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                    />
                                ) : (
                                    <p className="mt-1 text-lg text-gray-900">{userData.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full p-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                    />
                                ) : (
                                    <p className="mt-1 text-lg text-gray-900 flex items-center">
                                        <HiMail className="h-5 w-5 text-teal-600 mr-2" /> {userData.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full p-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                    />
                                ) : (
                                    <p className="mt-1 text-lg text-gray-900 flex items-center">
                                        <HiPhone className="h-5 w-5 text-teal-600 mr-2" /> {userData.phone}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                                <p className="mt-1 text-lg text-gray-900">{userData.rollNumber}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Class</label>
                                <p className="mt-1 text-lg text-gray-900">{userData.class}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                {isEditing ? (
                                    <textarea
                                        name="address"
                                        draggable="false"
                                        value={userData.address}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full p-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                    />
                                ) : (
                                    <p className="mt-1 text-lg text-gray-900">{userData.address}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                className="flex cursor-pointer items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
                            >
                                <HiCheckCircle className="h-5 w-5" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    )}

                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <HiCheckCircle className="h-6 w-6 text-teal-600" />
                                <p className="text-sm text-gray-600">Profile updated on 10 Mar 2025</p>
                            </li>
                            <li className="flex items-center space-x-3">
                                <HiCheckCircle className="h-6 w-6 text-teal-600" />
                                <p className="text-sm text-gray-600">Joined class 10th Grade on 01 Jan 2025</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;