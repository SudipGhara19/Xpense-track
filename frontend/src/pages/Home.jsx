import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Transactions from '../components/Transactions.jsx';
import Expenses from '../components/Expenses.jsx';
import { useLocation } from 'react-router-dom';
import Income from '../components/Income.jsx';

function Home() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get("tab") || "dashboard";

    return (
        <div className='w-screen h-screen flex'>
            {/* Sidebar - Fixed at 20% width on desktop, hidden on mobile */}
            <div className='w-[20%] h-screen bg-gray-800 md:block hidden fixed left-0 top-0'>
                <Sidebar />
            </div>

            {/* Main Content - Scrollable */}
            <div className='w-full md:w-[80%] ml-auto h-screen overflow-y-auto p-5'>
                <h1 className="text-center mt-10 text-2xl font-bold">Welcome to the Home Page</h1>


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
