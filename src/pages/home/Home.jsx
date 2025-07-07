import React, { useState, useEffect } from 'react';
import { HiUpload, HiAcademicCap, HiBell, HiCurrencyRupee, HiStar } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import school from "../../assets/school.jpg"

const Home = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        dateOfBirth: '',
        parentName: '',
        email: '',
        phone: '',
        address: '',
        previousSchool: '',
    });
    const [gallery, setGallery] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'guest');

    // Static data for new sections
    const features = [
        {
            title: 'Digital Learning Hub',
            description: 'Access study materials, video lectures, and assignments anytime, anywhere.',
            icon: <HiAcademicCap className="h-12 w-12 text-teal-600 mb-4 mx-auto" />,
        },
        {
            title: 'Smart Notifications',
            description: 'Stay updated with instant alerts for exams, events, and attendance.',
            icon: <HiBell className="h-12 w-12 text-teal-600 mb-4 mx-auto" />,
        },
        {
            title: 'Effortless Fee Management',
            description: 'Pay fees online and track payment history with ease.',
            icon: <HiCurrencyRupee className="h-12 w-12 text-teal-600 mb-4 mx-auto" />,
        },
        {
            title: 'Role-Based Access',
            description: 'Secure dashboards tailored for students, teachers, and admins.',
            icon: <svg className="h-12 w-12 text-teal-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-2 4-2 4m0 0c-1.104 0-2-.896-2-2s.896-2 2-2zm0 0c1.104 0 2 .896 2 2s-.896 2-2 2m-6-2c0-1.104.896-2 2-2s2 .896 2 2-2 4-2 4m0 0c-1.104 0-2-.896-2-2s.896-2 2-2zm0 0c1.104 0 2 .896 2 2s-.896 2-2 2" />
            </svg>,
        },
    ];

    const whyChooseUs = [
        { title: 'Intuitive Interface', description: 'User-friendly design for seamless navigation.' },
        { title: 'Secure Platform', description: 'Your data is protected with top-notch security.' },
        { title: '24/7 Accessibility', description: 'Access the platform anytime, anywhere.' },
        { title: 'Scalable Solution', description: 'Adapts to schools of any size and need.' },
    ];

    const testimonials = [
        { quote: 'This platform has transformed how we manage our school!', author: 'Admin Patel', avatar: '👨‍💼', role: 'Admin' },
        { quote: 'Accessing study materials has never been easier!', author: 'Priya K., Student', avatar: '👩‍🎓', role: 'Student' },
        { quote: 'Grading and attendance tracking is now a breeze.', author: 'Mrs. Sharma', avatar: '👩‍🏫', role: 'Teacher' },
    ];

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/gallery`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                });
                setGallery(response?.data?.gallery || []);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch gallery error:', error);
                setError('Failed to fetch gallery images. Please try again later.');
                toast.error(error.response?.data?.message || 'Failed to fetch gallery images', {
                    style: { background: '#ef4444', color: '#ffffff', fontWeight: '600', padding: '12px 20px', borderRadius: '8px' },
                });
                setIsLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Submitting admission form...', {
            style: { background: '#0f766e', color: '#ffffff', fontWeight: '600', padding: '12px 20px', borderRadius: '8px' },
        });
        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admissions`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setFormData({
                studentName: '',
                dateOfBirth: '',
                parentName: '',
                email: '',
                phone: '',
                address: '',
                previousSchool: '',
            });
            toast.success('Admission form submitted successfully!', {
                id: toastId,
                style: { background: '#0f766e', color: '#ffffff', fontWeight: '600', padding: '12px 20px', borderRadius: '8px' },
            });
        } catch (error) {
            console.error('Submit admission error:', error);
            toast.error(error.response?.data?.message || 'Failed to submit admission form', {
                id: toastId,
                style: { background: '#ef4444', color: '#ffffff', fontWeight: '600', padding: '12px 20px', borderRadius: '8px' },
            });
        }
    };

    const handleUploadGalleryImage = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Uploading gallery image...', {
            style: { background: '#0f766e', color: '#ffffff', fontWeight: '600', padding: '12px 20px', borderRadius: '8px' },
        });
        try {
            const uploadData = new FormData();
            uploadData.append('title', e.target.title.value);
            uploadData.append('description', e.target.description.value);
            uploadData.append('file', e.target.file.files[0]);
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/gallery`, uploadData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setGallery([...gallery, response.data.image]);
            e.target.reset();
            toast.success('Gallery image uploaded successfully!', {
                id: toastId,
                style: { background: '#0f766e', color: '#ffffff', fontWeight: '600', padding: '12px 20px', borderRadius: '8px' },
            });
        } catch (error) {
            console.error('Upload gallery image error:', error);
            toast.error(error.response?.data?.message || 'Failed to upload gallery image', {
                id: toastId,
                style: { background: '#ef4444', color: '#ffffff', fontWeight: '600', padding: '12px 20px', borderRadius: '8px' },
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/src/assets/wave-pattern.svg')] opacity-10"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in">
                            Welcome to EduManage School
                        </h1>
                        <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-8 animate-slide-up">
                            Empowering education with seamless management for students, teachers, and admins.
                        </p>
                        <a
                            href="#admission"
                            className="inline-block bg-white text-teal-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-teal-100 transition-all duration-300 shadow-lg transform"
                        >
                            Start Your Journey
                        </a>
                    </div>
                </section>

                {/* Our Mission Section */}
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-fade-in">Our Mission</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                            At EduManage, we aim to revolutionize school management by providing a unified platform that connects students, teachers, and admins. Our goal is to streamline operations, enhance learning experiences, and foster collaboration through innovative technology.
                        </p>
                        <a
                            href="/promotions"
                            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300"
                        >
                            Learn More
                        </a>
                    </div>
                </section>

                {/* Features Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in">Why EduManage Stands Out</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1 border-b-4 border-teal-600"
                            >
                                {feature.icon}
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{feature.title}</h3>
                                <p className="text-gray-600 text-center">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="bg-gray-100 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in">Why Choose Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {whyChooseUs.map((reason, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-sm transition-all duration-300 text-center"
                                >
                                    <HiStar className="h-10 w-10 text-teal-600 mb-4 mx-auto" />
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{reason.title}</h3>
                                    <p className="text-gray-600">{reason.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in">About EduManage School</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="flex flex-col justify-center">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                EduManage School is a cutting-edge platform designed to simplify school operations and enhance learning. From digital classrooms to real-time notifications, we provide tools that empower students, teachers, and admins to succeed.
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                                <li>Interactive digital classrooms with multimedia support</li>
                                <li>Centralized study material management for all grades</li>
                                <li>Real-time communication via notifications and alerts</li>
                                <li>Secure, role-based dashboards for personalized access</li>
                                <li>Comprehensive analytics for academic and operational insights</li>
                            </ul>
                            <a
                                href="/promotions"
                                className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300"
                            >
                                Explore Our Features
                            </a>
                        </div>
                        <div className="relative">
                            <img
                                src={school}
                                alt="EduManage School"
                                className="rounded-lg shadow-md w-full h-96 object-conatin"
                            />
                            <div className="absolute inset-0 bg-teal-600 opacity-20 rounded-lg"></div>
                        </div>
                    </div>
                </section>

                {/* Admission Section */}
                <section id="admission" className="bg-gray-100 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in">
                            {userRole === 'student' ? 'Join Our School' : 'Contribute to Our Gallery'}
                        </h2>
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                            {userRole === 'student' ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Full Name</label>
                                        <input
                                            type="text"
                                            id="studentName"
                                            name="studentName"
                                            value={formData.studentName}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                            placeholder="Enter student's full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">Parent/Guardian Full Name</label>
                                        <input
                                            type="text"
                                            id="parentName"
                                            name="parentName"
                                            value={formData.parentName}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                            placeholder="Enter parent/guardian's full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Residential Address</label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                            rows="4"
                                            placeholder="Enter full address"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700">Previous School Name (if applicable)</label>
                                        <input
                                            type="text"
                                            id="previousSchool"
                                            name="previousSchool"
                                            value={formData.previousSchool}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                            placeholder="Enter previous school name"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform"
                                    >
                                        Submit Application
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleUploadGalleryImage} className="space-y-6">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                            placeholder="Enter image title"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                            placeholder="Enter image description"
                                            rows="4"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload Image</label>
                                        <input
                                            type="file"
                                            id="file"
                                            name="file"
                                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300"
                                            accept="image/jpeg,image/png"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <HiUpload className="h-5 w-5 inline mr-2" />
                                        Upload Image
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in">What Our Community Says</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-teal-600"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">{testimonial.avatar}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-teal-600">{testimonial.author}</p>
                                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                                <div className="flex mt-3">
                                    <HiStar className="h-5 w-5 text-yellow-400" />
                                    <HiStar className="h-5 w-5 text-yellow-400" />
                                    <HiStar className="h-5 w-5 text-yellow-400" />
                                    <HiStar className="h-5 w-5 text-yellow-400" />
                                    <HiStar className="h-5 w-5 text-yellow-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in">Our Vibrant Campus</h2>
                    {isLoading ? (
                        <div className="text-center text-gray-600 animate-pulse">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-600">{error}</div>
                    ) : gallery.length === 0 ? (
                        <div className="text-center text-gray-600">No gallery images available</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {gallery.map((image) => (
                                <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md">
                                    <img
                                        src={`${import.meta.env.VITE_REACT_APP_API_URL}${image.fileUrl}`}
                                        alt={image.title}
                                        className="w-full h-64 object-cover transform transition-all duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="p-4 text-black">
                                            <p className="text-sm font-semibold">{image.title}</p>
                                            <p className="text-xs">{image.description}</p>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />

            {/* Tailwind Animation Styles */}
            <style>
                {`
          .animate-fade-in {
            animation: fadeIn 1s ease-in-out;
          }
          .animate-slide-up {
            animation: slideUp 1s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
            </style>
        </div>
    );
};

export default Home;