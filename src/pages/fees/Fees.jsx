import { useState } from 'react';
import { HiCurrencyRupee, HiDocumentDownload } from 'react-icons/hi';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';
import toast from 'react-hot-toast';


const Fees = () => {
    const [userRole] = useState('admin'); // Can be 'student', 'teacher', or 'admin'
    const [feeStructure, setFeeStructure] = useState([
        { id: 1, class: 'Class 10', type: 'Tuition Fee', amount: 5000, dueDate: '2025-07-01', status: 'Pending' },
        { id: 2, class: 'Class 10', type: 'Library Fee', amount: 1000, dueDate: '2025-07-01', status: 'Paid' },
    ]);
    const [paymentHistory, setPaymentHistory] = useState([
        { id: 1, date: '2025-06-01', type: 'Tuition Fee', amount: 5000, status: 'Completed', method: 'QR Payment' },
        { id: 2, date: '2025-05-15', type: 'Library Fee', amount: 1000, status: 'Completed', method: 'Online' },
    ]);

    const handlePayNow = (feeId) => {
        const toastId = toast.loading(`Initiating payment for Fee ID: ${feeId}...`);

        // Simulate payment process
        setTimeout(() => {
            if (feeId) {
                toast.success('Payment successful!', {
                    id: toastId,
                    duration: 3000,
                });
                // Optional: navigate somewhere after payment
                // navigate('/payment-success');
            } else {
                toast.error('Payment failed. Invalid Fee ID.', {
                    id: toastId,
                    duration: 3000,
                });
            }
        }, 2000);
    };


    const handleAddFee = (e) => {
        e.preventDefault();
        // Placeholder for adding new fee structure
        const newFee = {
            id: feeStructure.length + 1,
            class: e.target.class.value,
            type: e.target.type.value,
            amount: parseFloat(e.target.amount.value),
            dueDate: e.target.dueDate.value,
            status: 'Pending',
        };
        setFeeStructure([...feeStructure, newFee]);
        e.target.reset();
    };

    const handleExportReport = () => {
        const toastId = toast.loading('Preparing payment history for export...');

        // Simulate export process
        setTimeout(() => {
            toast.success('Exporting payment history as PDF/Excel', {
                id: toastId,
            });
        }, 2000);
    };
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                        Fees Management
                    </h1>

                    {userRole === 'admin' && (
                        <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Fee Structure</h2>
                            <form onSubmit={handleAddFee} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
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
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
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
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Fees;
