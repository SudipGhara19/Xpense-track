import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Transactions from '../components/Transactions.jsx';
import Expenses from '../components/Expenses.jsx';
import { useLocation } from 'react-router-dom';
import Income from '../components/Income.jsx';
import { LuLayoutDashboard } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { GiWallet } from "react-icons/gi";
import { FaCircleDollarToSlot } from "react-icons/fa6";

function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get("tab") || "dashboard";

    // Define a mapping of tabs to icons and titles
    const tabInfo = {
        dashboard: { title: "Dashboard", icon: <LuLayoutDashboard className="inline-block mr-2 text-violet-600" /> },
        transactions: { title: "Transactions", icon: <GrTransaction className="inline-block mr-2 text-violet-600" /> },
        expenses: { title: "Expenses", icon: <GiWallet className="inline-block mr-2 text-violet-600" /> },
        incomes: { title: "Incomes", icon: <FaCircleDollarToSlot className="inline-block mr-2 text-violet-600" /> },
    };

    return (
        <div className='w-screen h-screen flex'>
            {/* Sidebar - Fixed at 20% width on desktop, hidden on mobile */}
            <div className='w-[20%] h-screen bg-gray-800 md:block hidden fixed left-0 top-0'>
                <Sidebar />
            </div>

            {/* Main Content - Scrollable */}
            <div className='w-full md:w-[80%] ml-auto h-screen overflow-y-auto p-2 md:p-5'>
                <h1 className="text-center mt-20 md:mt-0 text-2xl font-bold flex items-center justify-center pb-3 border-b-[1px] border-gray-300">
                    {tabInfo[activeTab]?.icon} {tabInfo[activeTab]?.title}
                </h1>

                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'transactions' && <Transactions />}
                {activeTab === 'expenses' && <Expenses />}
                {activeTab === 'incomes' && <Income />}
            </div>

            {/* Mobile Navbar - Only visible on small screens */}
            <div className='fixed top-0 w-full bg-gray-800 md:hidden'>
                <Sidebar />
            </div>
        </div>
    );
}

export default Home;
