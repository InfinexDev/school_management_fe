import React, { useState } from 'react';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import schoolImage from '../../assets/school_logo.jpg';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Admission form submitted successfully!');
        setFormData({
            studentName: '',
            dateOfBirth: '',
            grade: '',
            parentName: '',
            email: '',
            phone: '',
            address: '',
            previousSchool: '',
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                {/* Hero Section */}
                <section className="relative bg-teal-600 text-white py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-500 opacity-50"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in">
                            Welcome to EduManage School
                        </h1>
                        <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-8">
                            Transforming education with innovative management solutions for students, teachers, and parents.
                        </p>
                        <a
                            href="#admission"
                            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                        >
                            Apply Now
                        </a>
                    </div>
                </section>

                {/* Features Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Why Choose EduManage?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-sm transition-shadow duration-300">
                            <svg className="h-12 w-12 text-teal-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Digital Learning</h3>
                            <p className="text-gray-600 text-center">
                                Access video lectures, PDFs, and class-wise study materials through our intuitive mobile app.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-sm transition-shadow duration-300">
                            <svg className="h-12 w-12 text-teal-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H3v-2a3 3 0 015.356-1.857M7 20a3 3 0 01-3-3V7a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3M7 20h10" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Smart Attendance</h3>
                            <p className="text-gray-600 text-center">
                                Paperless attendance tracking with instant notifications to parents for absences.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-sm transition-shadow duration-300">
                            <svg className="h-12 w-12 text-teal-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Fee Management</h3>
                            <p className="text-gray-600 text-center">
                                Simplified fee collection with online payments and detailed payment history reports.
                            </p>
                        </div>
                    </div>
                </section>

                {/* About & Admission Section */}
                <section id="admission" className="bg-gray-100 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">About EduManage School</h2>
                                <p className="text-lg text-gray-700 mb-6">
                                    EduManage School is dedicated to fostering academic excellence and holistic development. Our state-of-the-art facilities and innovative management system ensure that students, teachers, and parents stay connected and informed.
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                                    <li>Modern classrooms equipped with smart boards</li>
                                    <li>Comprehensive digital library with multimedia content</li>
                                    <li>Real-time communication via WhatsApp, SMS, and email</li>
                                    <li>Data-driven academic and attendance reports</li>
                                    <li>Secure, role-based access for all stakeholders</li>
                                </ul>
                                <a
                                    href="/promotions"
                                    className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300"
                                >
                                    Discover More
                                </a>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Admission Form
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                                            Student Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="studentName"
                                            name="studentName"
                                            value={formData.studentName}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                            placeholder="Enter student's full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
                                            Parent/Guardian Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="parentName"
                                            name="parentName"
                                            value={formData.parentName}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                            placeholder="Enter parent/guardian's full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Residential Address
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-4 py-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                            rows="4"
                                            placeholder="Enter full address"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700">
                                            Previous School Name (if applicable)
                                        </label>
                                        <input
                                            type="text"
                                            id="previousSchool"
                                            name="previousSchool"
                                            value={formData.previousSchool}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-3 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                            placeholder="Enter previous school name"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300"
                                    >
                                        Submit Application
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Campus</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <img src={schoolImage} alt="Campus" className="rounded-lg shadow-md" />
                        <img src={schoolImage} alt="Classroom" className="rounded-lg shadow-md" />
                        <img src={schoolImage} alt="Library" className="rounded-lg shadow-md" />
                    </div>
                </section>
            </main>
            <Footer />
        </div >
    );
};

export default Home;