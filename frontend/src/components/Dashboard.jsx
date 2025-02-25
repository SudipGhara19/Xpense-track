import React, { useEffect, useState } from "react";
import { MdAttachMoney, MdArrowForward, MdEdit } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { BiWallet } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import SetBudgetModal from "./modals/SetBudgetModal";
import { toast } from "react-toastify";
import { getTransactionData } from "../api/transactionService.js";
import { useDispatch, useSelector } from "react-redux";
import { setTransactionData } from "../redux/transactionSlice.js";
import ClipLoader from "react-spinners/ClipLoader";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { motion } from 'framer-motion'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {


    const { currentUser } = useSelector((state) => state.user);
    const { transactionData } = useSelector((state) => state.transaction);

    const [isSetBudget, setIsSetBudget] = useState(false);
    const [budget, setBudget] = useState(transactionData?.budget || 0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const totalIncome = transactionData?.transactions?.reduce((sum, txn) => (txn.type === "income" ? sum + txn.amount : sum), 0);
    const totalExpenses = transactionData?.transactions?.reduce((sum, txn) => (txn.type === "expense" ? sum + txn.amount : sum), 0);
    const remainingAmount = budget + totalIncome - totalExpenses;

    // Get Data Function
    const handleGetData = async () => {
        try {
            setLoading(true);
            const response = await getTransactionData(currentUser._id);

            if (response?.error) {
                toast.error(response.error || "Cannot fetch data. Try again later.");
                return;
            }
            dispatch(setTransactionData(response.budget));
        } catch (error) {
            console.log(error);
            toast.error("Cannot fetch data.");
        } finally {
            setLoading(false);
        }
    };

    // geting data and set to the redux on render
    useEffect(() => {
        handleGetData();
    }, []);


    // Bar chart Data
    const barData = {
        labels: ["Income", "Expenses"],
        datasets: [
            {
                label: "Amount (₹)",
                data: [totalIncome, totalExpenses],
                backgroundColor: ["#36A2EB", "#FF6384"],
                borderColor: ["#2E86C1", "#E74C3C"],
                borderWidth: 1,
            },
        ],
    };

    // Pie chart data
    const pieData = {
        labels: ["Income Transactions", "Expense Transactions"],
        datasets: [
            {
                data: [
                    transactionData?.transactions?.filter((txn) => txn.type === "income").length || 0,
                    transactionData?.transactions?.filter((txn) => txn.type === "expense").length || 0,
                ],
                backgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };

    // Doughnut chart's data
    const doughnutData = {
        labels: ["Remaining Amount", "Used Amount"],
        datasets: [
            {
                data: [remainingAmount, totalIncome + budget - remainingAmount],
                backgroundColor: ["#4CAF50", "#FF9800"],
            },
        ],
    };

    //pop upwards animation value
    const popUpVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
    };
    //left to right animation value
    const leftToRightVariant = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
    };
    //right to left animation value
    const rightToLeftVariant = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
    };

    return (
        <>
            {loading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <ClipLoader color="#930abe" size={42} speedMultiplier={1} />
                </div>
            ) : (
                <div className="w-full h-auto py-5">
                    <div className="w-full flex flex-col items-center sm:flex-row sm:justify-center gap-4">
                        {/* Budget */}
                        <motion.div
                            className="w-full sm:w-1/3 h-32 bg-yellow-300 rounded-lg p-4 flex justify-between items-start relative"
                            variants={leftToRightVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}>
                            <div className="h-full flex flex-col gap-2">
                                <MdAttachMoney className="text-3xl text-yellow-700" />
                                <h2 className="text-lg text-white font-semibold">Budget</h2>
                            </div>
                            <span className="text-3xl font-bold text-white">${transactionData?.budget}</span>
                            <button onClick={() => setIsSetBudget(true)} className="absolute bottom-3 right-3 p-2 rounded-full bg-yellow-500 text-white hover:scale-110 transition-transform">
                                <MdEdit className="text-2xl" />
                            </button>
                        </motion.div>
                        {/* Transactions */}
                        <motion.div
                            className="w-full sm:w-1/3 h-32 bg-sky-400 rounded-lg p-4 flex justify-between items-start relative"
                            variants={popUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}>
                            <div className="h-full flex flex-col gap-2">
                                <FaExchangeAlt className="text-3xl text-sky-800" />
                                <h2 className="text-lg text-white font-semibold">Total Transactions</h2>
                            </div>
                            <span className="text-3xl font-bold text-white">{transactionData?.transactions?.length}</span>
                            <a href="/?tab=transactions" className="absolute bottom-3 right-3 p-2 rounded-full bg-sky-500 text-white hover:scale-110 transition-transform">
                                <MdArrowForward className="text-2xl" />
                            </a>
                        </motion.div>
                        {/* Remaining Amount */}
                        <motion.div
                            className="w-full sm:w-1/3 h-32 bg-green-400 rounded-lg p-4 flex justify-between items-start relative"
                            variants={rightToLeftVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}>
                            <div className="h-full flex flex-col gap-2">
                                <BiWallet className="text-3xl text-green-800" />
                                <h2 className="text-lg text-white font-semibold">Remaining Amount</h2>
                            </div>
                            <span className="text-3xl font-bold text-white">${remainingAmount}</span>
                        </motion.div>
                    </div>

                    {/* Charts */}
                    <div className="w-full mt-10 flex flex-col md:flex-row justify-center items-center gap-5">
                        <motion.div
                            variants={popUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="w-full h-full md:w-1/3 p-5 bg-white shadow-md rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Income vs Expenses</h2>
                            <Bar data={barData} />
                        </motion.div>
                        <motion.div
                            variants={popUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="w-full md:w-1/3 p-5 bg-white shadow-md rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Transaction Distribution</h2>
                            <Pie data={pieData} />
                        </motion.div>
                        <motion.div
                            variants={popUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="w-full md:w-1/3 p-5 bg-white shadow-md rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Remaining Amount</h2>
                            <Doughnut data={doughnutData} />
                        </motion.div>
                    </div>
                </div>
            )}

            {isSetBudget && <SetBudgetModal showModal={setIsSetBudget} setBudget={setBudget} budget={budget} />}
        </>
    );
}

export default Dashboard;
