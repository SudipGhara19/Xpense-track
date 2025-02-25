import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Transactions() {
  const { transactionData } = useSelector((state) => state.transaction);
  const navigate = useNavigate();

  const incomeTransactions = transactionData?.transactions?.filter((txn) => txn.type === "income") || [];
  const expenseTransactions = transactionData?.transactions?.filter((txn) => txn.type === "expense") || [];

  const totalIncome = incomeTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  const totalExpenses = expenseTransactions.reduce((sum, txn) => sum + txn.amount, 0);

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
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Transactions Overview</h2>

      {/* Bar Chart */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
        <Bar data={barData} />
      </div>

      {/* Transaction Lists */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Income Transactions */}
        <motion.div
          variants={leftToRightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-green-100 p-5 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-green-700">Last Income Transactions</h3>
            <a
              href="/?tab=incomes"
              className="text-green-600 flex items-center font-semibold hover:underline"
            >
              View All <FiArrowRight className="ml-1" />
            </a>
          </div>
          <ul className="space-y-3">
            {incomeTransactions.slice(0, 5).map((txn, index) => (
              <li key={index} className="p-3 bg-white rounded-md shadow flex flex-col">
                <div className="flex justify-between">
                  <span>{txn.description}</span>
                  <span className="text-green-600 font-semibold">+₹ {txn.amount}</span>
                </div>
                <span className="text-gray-500 text-xs mt-1">{new Date(txn.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Expense Transactions */}
        <motion.div
          variants={rightToLeftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-red-100 p-5 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-red-700">Last Expense Transactions</h3>
            <a
              href="/?tab=expenses"
              className="text-red-600 flex items-center font-semibold hover:underline"
            >
              View All <FiArrowRight className="ml-1" />
            </a>
          </div>
          <ul className="space-y-3">
            {expenseTransactions.slice(0, 5).map((txn, index) => (
              <li key={index} className="p-3 bg-white rounded-md shadow flex flex-col">
                <div className="flex justify-between">
                  <span>{txn.description}</span>
                  <span className="text-red-600 font-semibold">-₹ {txn.amount}</span>
                </div>
                <span className="text-gray-500 text-xs mt-1">{new Date(txn.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default Transactions;
