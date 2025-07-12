import React, { useState, useEffect } from 'react';
import { HiCurrencyRupee, HiDocumentDownload, HiCreditCard } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';

const Fees = () => {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'student');
    const [feeStructure, setFeeStructure] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [classOptions] = useState([
        'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
        'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12',
    ]);
    const [feeTypeOptions] = useState([
        'Tuition Fee', 'Exam Fee', 'Library Fee', 'Sports Fee', 'Transport Fee', 'Miscellaneous',
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requests = [
                    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/fees`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }),
                    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/payments`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    }),
                ];

                const responses = await Promise.all(requests);
                const [feesResponse, paymentsResponse] = responses;

                console.log('Fees Response:', feesResponse.data);
                console.log('Payments Response:', paymentsResponse.data);
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
    }, [userRole, feeStructure.length]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const sortData = (key, array, setArray) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedArray = [...array].sort((a, b) => {
            if (key === 'amount') {
                return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
            }
            if (key === 'dueDate' || key === 'date') {
                return direction === 'asc'
                    ? new Date(a[key]) - new Date(b[key])
                    : new Date(b[key]) - new Date(a[key]);
            }
            return direction === 'asc'
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key]);
        });
        setArray(sortedArray);
    };

    const handleAddFee = async (e) => {
        e.preventDefault();
        const amount = parseFloat(e.target.amount.value);
        const dueDate = new Date(e.target.dueDate.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (amount <= 0) {
            toast.error('Amount must be greater than zero', {
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
            return;
        }

        if (dueDate < today) {
            toast.error('Due date cannot be in the past', {
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
            return;
        }

        const confirmAdd = window.confirm(
            `Are you sure you want to add ${e.target.type.value} of ₹${amount} for all students in ${e.target.class.value}?`
        );
        if (!confirmAdd) {
            return;
        }

        setIsFormLoading(true);
        const toastId = toast.loading('Adding new fee for class...', {
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
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/fees`,
                {
                    class: e.target.class.value,
                    type: e.target.type.value,
                    amount,
                    dueDate: e.target.dueDate.value,
                },
                {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );
            setFeeStructure([...feeStructure, ...response.data.fees]);
            e.target.reset();
            toast.success(`Fee added for ${e.target.class.value} successfully!`, {
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
        } finally {
            setIsFormLoading(false);
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
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/fees/pay/${feeId}`,
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
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/payments/export`, {
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
            <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-10 text-center drop-shadow-md">
                        Fees Management Dashboard
                    </h1>

                    {isLoading ? (
                        <div className='h-[60vh] flex items-center justify-center'>
                            <div
                                class="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
                            >
                                <span
                                    class="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
                                >
                                </span>
                            </div>
                        </div>

                    ) : error ? (
                        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md">
                            <p className="text-lg">{error}</p>
                        </div>
                    ) : (
                        <>
                            {userRole === 'admin' && (
                                <div className="mb-12 bg-white p-8 rounded-2xl shadow-xl border border-teal-100">
                                    <h2 className="text-2xl font-bold text-gray-500 mb-6">Add New Fee Structure</h2>
                                    <form onSubmit={handleAddFee} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                                                Class
                                            </label>
                                            <select
                                                id="class"
                                                className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                                                required
                                                disabled={isFormLoading}
                                            >
                                                <option value="">Select Class</option>
                                                {classOptions.map((className) => (
                                                    <option key={className} value={className}>
                                                        {className}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                                Fee Type
                                            </label>
                                            <select
                                                id="type"
                                                className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                                                required
                                                disabled={isFormLoading}
                                            >
                                                <option value="">Select Fee Type</option>
                                                {feeTypeOptions.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                                Amount (₹)
                                            </label>
                                            <input
                                                type="number"
                                                id="amount"
                                                className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                                                placeholder="Enter amount"
                                                min="1"
                                                step="0.01"
                                                required
                                                disabled={isFormLoading}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                                Due Date
                                            </label>
                                            <input
                                                type="date"
                                                id="dueDate"
                                                className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                                                min={new Date().toISOString().split('T')[0]}
                                                required
                                                disabled={isFormLoading}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className={`col-span-1 sm:col-span-2 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform shadow-md ${isFormLoading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            disabled={isFormLoading}
                                        >
                                            {isFormLoading ? 'Adding Fee...' : 'Add Fee for Class'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            <div className="mb-12 bg-white p-8 rounded-2xl shadow-xl border border-teal-100">
                                <h2 className="text-2xl font-bold mb-6">Fee Structure</h2>
                                {feeStructure.length === 0 ? (
                                    <div className="text-center text-gray-600 py-6">
                                        No fees found.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-[#F9FAFB]">
                                                <tr>
                                                    <th
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                        onClick={() => sortData('studentName', feeStructure, setFeeStructure)}
                                                    >
                                                        Student Name {sortConfig.key === 'studentName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Roll No
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Class
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Fee Type
                                                    </th>
                                                    <th
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                        onClick={() => sortData('amount', feeStructure, setFeeStructure)}
                                                    >
                                                        Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                                    </th>
                                                    <th
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                        onClick={() => sortData('dueDate', feeStructure, setFeeStructure)}
                                                    >
                                                        Due Date {sortConfig.key === 'dueDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    {(userRole === 'student' || userRole === 'parent') && (
                                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Action
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {feeStructure.map((fee) => (
                                                    <tr key={fee.id} className="hover:bg-teal-50 transition-all duration-200">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.studentName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.rollNo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.class}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.type}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{fee.amount.toFixed(2)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(fee.dueDate)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${fee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                                    }`}
                                                            >
                                                                {fee.status}
                                                            </span>
                                                        </td>
                                                        {(userRole === 'student' || userRole === 'parent') && (
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                {fee.status === 'Pending' && (
                                                                    <button
                                                                        onClick={() => handlePayNow(fee.id)}
                                                                        className="text-teal-600 hover:text-gray-500 font-semibold flex items-center transition-all duration-200"
                                                                    >
                                                                        <HiCurrencyRupee className="h-5 w-5 mr-2" />
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

                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-teal-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Payment History</h2>
                                    <button
                                        onClick={handleExportReport}
                                        className="bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold flex items-center hover:bg-teal-700 transition-all duration-300 transform shadow-md"
                                    >
                                        <HiDocumentDownload className="h-5 w-5 mr-2" />
                                        Export Report
                                    </button>
                                </div>
                                {paymentHistory.length === 0 ? (
                                    <div className="text-center text-gray-600 py-6">
                                        No payment history found.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-teal-50">
                                                <tr>
                                                    <th
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                        onClick={() => sortData('studentName', paymentHistory, setPaymentHistory)}
                                                    >
                                                        Student Name {sortConfig.key === 'studentName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Roll No
                                                    </th>
                                                    <th
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                        onClick={() => sortData('date', paymentHistory, setPaymentHistory)}
                                                    >
                                                        Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Fee Type
                                                    </th>
                                                    <th
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                        onClick={() => sortData('amount', paymentHistory, setPaymentHistory)}
                                                    >
                                                        Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Payment Method
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {paymentHistory.map((payment) => (
                                                    <tr key={payment.id} className="hover:bg-teal-50 transition-all duration-200">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.studentName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.rollNo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(payment.date)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.type}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{payment.amount.toFixed(2)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                                    }`}
                                                            >
                                                                {payment.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <div className="flex items-center">
                                                                {payment.method === 'UPI' && <HiCurrencyRupee className="h-5 w-5 mr-2 text-teal-600" />}
                                                                {payment.method === 'Card' && <HiCreditCard className="h-5 w-5 mr-2 text-teal-600" />}
                                                                {payment.method}
                                                            </div>
                                                        </td>
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