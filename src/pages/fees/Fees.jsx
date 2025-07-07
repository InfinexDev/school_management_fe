import React, { useState, useEffect } from 'react';
import { HiCurrencyRupee, HiDocumentDownload } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';

const Fees = () => {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'student');
    const [feeStructure, setFeeStructure] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requests = [
                    axios.get('/api/fees', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }),
                    axios.get('/api/payments', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }),
                ];

                // Only fetch students if user is admin
                if (userRole === 'admin') {
                    requests.push(
                        axios.get('/api/users/students', {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                        })
                    );
                }

                const responses = await Promise.all(requests);
                const [feesResponse, paymentsResponse, studentsResponse] = responses;

                console.log('Fees Response:', feesResponse.data);
                console.log('Payments Response:', paymentsResponse.data);
                if (userRole === 'admin') {
                    console.log('Students Response:', studentsResponse.data);
                    setStudents(studentsResponse?.data?.students || []);
                }
                setFeeStructure(feesResponse?.data?.fees || []);
                setPaymentHistory(paymentsResponse?.data?.payments || []);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch data error:', error);
                setError('Failed to fetch data. Please try again later.');
                toast.error(error.response?.data?.message || 'Failed to fetch data', {
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

        fetchData();
    }, [userRole]);

    const handleAddFee = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Adding new fee...', {
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
            const response = await axios.post(
                '/api/fees',
                {
                    studentId: e.target.student.value,
                    class: e.target.class.value,
                    type: e.target.type.value,
                    amount: parseFloat(e.target.amount.value),
                    dueDate: e.target.dueDate.value,
                },
                {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );
            setFeeStructure([...feeStructure, response.data.fee]);
            e.target.reset();
            toast.success('Fee added successfully!', {
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
            console.error('Add fee error:', error);
            toast.error(error.response?.data?.message || 'Failed to add fee', {
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

    const handlePayNow = async (feeId) => {
        const toastId = toast.loading(`Initiating payment for Fee ID: ${feeId}...`, {
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
            const response = await axios.post(
                `/api/fees/pay/${feeId}`,
                { method: 'UPI' },
                {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );
            setFeeStructure(feeStructure.map((fee) =>
                fee.id === feeId ? { ...fee, status: 'Paid' } : fee
            ));
            setPaymentHistory([...paymentHistory, response.data.payment]);
            toast.success('Payment successful!', {
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
            console.error('Payment error:', error);
            toast.error(error.response?.data?.message || 'Payment failed', {
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

    const handleExportReport = async () => {
        const toastId = toast.loading('Preparing payment history for export...', {
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
            const response = await axios.get('/api/payments/export', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'payment_history.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('Payment history exported successfully!', {
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
            console.error('Export report error:', error);
            toast.error(error.response?.data?.message || 'Failed to export report', {
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
                        Fees Management
                    </h1>

                    {isLoading ? (
                        <div className="text-center">
                            <p className="text-lg text-gray-600">Loading...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                            <p>{error}</p>
                        </div>
                    ) : (
                        <>
                            {userRole === 'admin' && (
                                <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Fee Structure</h2>
                                    <form onSubmit={handleAddFee} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                                                Student
                                            </label>
                                            <select
                                                id="student"
                                                className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                                required
                                            >
                                                <option value="">Select Student</option>
                                                {students.map((student) => (
                                                    <option key={student._id} value={student._id}>
                                                        {student.name} {student?.class && (`(${student?.class})`)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                                                Class
                                            </label>
                                            <input
                                                type="text"
                                                id="class"
                                                className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                                placeholder="Enter class (e.g., Class 10)"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                                Fee Type
                                            </label>
                                            <input
                                                type="text"
                                                id="type"
                                                className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                                placeholder="Enter fee type (e.g., Tuition Fee)"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                                Amount
                                            </label>
                                            <input
                                                type="number"
                                                id="amount"
                                                className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                                placeholder="Enter amount"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                                Due Date
                                            </label>
                                            <input
                                                type="date"
                                                id="dueDate"
                                                className="mt-1 w-full px-4 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-teal-500 focus:ring-1 focus:border-teal-500 transition-all duration-300"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="col-span-1 sm:col-span-2 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform cursor-pointer"
                                        >
                                            Add Fee
                                        </button>
                                    </form>
                                </div>
                            )}

                            <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Fee Structure</h2>
                                {feeStructure.length === 0 ? (
                                    <div className="text-center text-gray-600 py-4">
                                        No fees found.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Student Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Roll No
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Class
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Fee Type
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Amount
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Due Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    {(userRole === 'student' || userRole === 'parent') && (
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Action
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {feeStructure.map((fee) => (
                                                    <tr key={fee.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.studentName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.rollNo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.class}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.type}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{fee.amount}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.dueDate}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.status}</td>
                                                        {(userRole === 'student' || userRole === 'parent') && (
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                {fee.status === 'Pending' && (
                                                                    <button
                                                                        onClick={() => handlePayNow(fee.id)}
                                                                        className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold flex items-center"
                                                                    >
                                                                        <HiCurrencyRupee className="h-5 w-5 mr-1" />
                                                                        Pay Now
                                                                    </button>
                                                                )}
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
                                    <button
                                        onClick={handleExportReport}
                                        className="bg-teal-600 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold flex items-center hover:bg-teal-700 transition-all duration-300 transform shadow-md"
                                    >
                                        <HiDocumentDownload className="h-5 w-5 mr-2" />
                                        Export Report
                                    </button>
                                </div>
                                {paymentHistory.length === 0 ? (
                                    <div className="text-center text-gray-600 py-4">
                                        No payment history found.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Student Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Roll No
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Fee Type
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Amount
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Payment Method
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {paymentHistory.map((payment) => (
                                                    <tr key={payment.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.studentName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.rollNo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.type}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{payment.amount}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.status}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.method}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Fees;