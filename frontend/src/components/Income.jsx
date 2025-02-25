import React, { useState } from "react";
import { FaUniversity, FaMobileAlt, FaCreditCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import AddUpiIncomeModal from "./modals/AddUpiIncomeModal";
import AddCardIncomeModal from "./modals/AddCardIncomeModal";
import AddBankIncomeModal from "./modals/AddBankIncomeModal";
import TransactionDetailsModal from "./modals/TransactionDetailsModal";


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Income() {
    const { transactionData } = useSelector((state) => state.transaction);
    const incomes = transactionData?.transactions.filter((c) => c.type === "income");

    const [isUpi, setIsUpi] = useState(false);
    const [isCard, setIsCard] = useState(false);
    const [isBank, setIsBank] = useState(false);
    const [isViewDetails, setIsViewDetails] = useState(false)
    const [txnData, setTxnData] = useState(null);
    const [visibleIncomes, setVisibleIncomes] = useState(5);


    // Transaction Methods Count
    const upiCount = incomes?.filter((txn) => txn.tranInfo.method === "UPI").length || 0;
    const bankCount = incomes?.filter((txn) => txn.tranInfo.method === "Bank").length || 0;
    const cardCount = incomes?.filter((txn) => txn.tranInfo.method === "Card").length || 0;

    const totalIncome = transactionData?.transactions?.reduce((sum, txn) => (txn.type === "income" ? sum + txn.amount : sum), 0);
    const totalIncomeTxn = transactionData?.transactions?.filter((txn) => txn.type === "income").length || 0;


    const categories = [
        "Investments",
        "Salary",
        "Business",
        "Freelance",
        "Gifts",
        "Split Bills",
        "Cashbacks",
        "Others"
    ]

    // Ensure transactionData.transactions exists
    const transactions = transactionData?.transactions || [];

    // Count transactions per category
    const categoryCounts = categories.map((category) => {
        return transactions.reduce((count, txn) => {
            return txn?.category === category ? count + 1 : count;
        }, 0);
    });


    // Pie Chart Data for Payment Methods
    const pieChartData = {
        labels: ["Receive via UPI", "Receive Via Bank", "Receive Via Card"],
        datasets: [
            {
                label: "Number of Transactions",
                data: [upiCount, bankCount, cardCount],
                backgroundColor: ["#8B5CF6", "#3B82F6", "#EF4444"],
                borderColor: ["#6D28D9", "#1E40AF", "#B91C1C"],
                borderWidth: 2,
            },
        ],
    };


    // Bar Chart Data for Expense Categories
    const categoryChartData = {
        labels: categories,
        datasets: [
            {
                label: "Number of Transactions by Category",
                data: categoryCounts,
                backgroundColor: [
                    "#10B981", "#3B82F6", "#EF4444", "#F59E0B", "#8B5CF6",
                    "#22C55E", "#6366F1", "#EC4899", "#F43F5E", "#14B8A6", "#A855F7"
                ],
                borderColor: [
                    "#059669", "#1E40AF", "#B91C1C", "#B45309", "#6D28D9",
                    "#15803D", "#4338CA", "#9D174D", "#BE123C", "#0F766E", "#7E22CE"
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart Options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
        },
    };

    // show more funtion
    const showMoreIncomes = () => {
        setVisibleIncomes((prev) => prev + 5);
    };

    const handleViewTransaction = (data) => {
        setTxnData(data);
        setIsViewDetails(true);
    }

    return (
        <>
            <div className="w-full h-auto">
                <h1 className="font-bold text-xl text-gray-600">List a new income:</h1>

                {/* ------ Adding options ------- */}
                <div className="w-full h-auto flex flex-col justify-center items-center sm:flex-row sm:justify-center sm:items-center gap-4 mt-3">
                    {/* via UPI */}
                    <div onClick={() => setIsUpi(true)} className="w-full sm:w-1/3 h-24 bg-green-600 rounded-lg p-4 flex justify-between items-center text-white relative 
                    hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FaMobileAlt size={40} />
                        <h2 className="text-lg font-semibold">UPI Payment</h2>
                    </div>
                    {/* via Bank */}
                    <div onClick={() => setIsBank(true)} className="w-full sm:w-1/3 h-24 bg-green-600 rounded-lg p-4 flex justify-between items-center text-white relative 
                    hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FaUniversity size={40} />
                        <h2 className="text-lg font-semibold">Bank Transfer</h2>
                    </div>
                    {/* via Card */}
                    <div onClick={() => setIsCard(true)} className="w-full sm:w-1/3 h-24 bg-green-600 rounded-lg p-4 flex justify-between items-center text-white relative 
                    hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FaCreditCard size={40} />
                        <h2 className="text-lg font-semibold">Card Payment</h2>
                    </div>
                </div>

                {/* ------ Expense Summary (Pie Chart + Summary Card) ------- */}
                <div className="w-full flex flex-wrap sm:flex-nowrap justify-center gap-5 mt-6">
                    {/* Expense Summary Card */}
                    <div className="w-full sm:w-1/2 h-80 p-4 bg-white shadow-md rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">Total Income</h2>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-purple-600">₹{totalIncome}</p>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-lg text-gray-600 mt-2">Total Expense Transactions</p>
                            <p className="text-3xl font-bold text-blue-600">{totalIncomeTxn}</p>

                        </div>
                    </div>
                    {/* Pie Chart Card */}
                    <div className="w-full sm:w-1/2 h-80 p-4 bg-white shadow-md rounded-lg flex flex-col justify-center items-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">Income Summary</h2>
                        <div className="w-full h-full flex justify-center items-center">
                            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>

                {/* ------ Category-wise Expense Chart ------- */}
                <div className="w-full h-64 p-4 bg-white shadow-md rounded-lg my-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Income Breakdown by Category</h2>
                    <Bar data={categoryChartData} options={chartOptions} />
                </div>

                {/* Expense List */}
                <h2 className="text-2xl text-center font-bold text-gray-700 mt-16 mb-4">All Incomes</h2>
                <div className="space-y-3">
                    {incomes.slice(0, visibleIncomes).map((txn, index) => (
                        <div key={index} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center border-l-4 border-blue-500">
                            <div>
                                <p className="font-bold text-gray-800">{txn.category}</p>
                                <p className="text-sm text-gray-500">{new Date(txn.date).toLocaleDateString()} - {txn.tranInfo.method}</p>
                            </div>
                            <div className="text-green-600 font-bold text-lg">₹{txn.amount}</div>
                            <button onClick={() => handleViewTransaction(txn)} className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">View Details</button>
                        </div>
                    ))}
                </div>
                {visibleIncomes < incomes.length && (
                    <div className="text-center mt-4">
                        <button onClick={showMoreIncomes} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                            Show More
                        </button>
                    </div>
                )}

            </div>

            {isUpi && <AddUpiIncomeModal showModal={isUpi} setShowModal={setIsUpi} />}
            {isCard && <AddCardIncomeModal showModal={isCard} setShowModal={setIsCard} />}
            {isBank && <AddBankIncomeModal showModal={isBank} setShowModal={setIsBank} />}
            {isViewDetails && <TransactionDetailsModal showModal={isViewDetails} setShowModal={setIsViewDetails} tnx={txnData} />}

        </>
    );
}

export default Income;
