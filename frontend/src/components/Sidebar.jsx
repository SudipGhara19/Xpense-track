import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { GiWallet } from "react-icons/gi";
import { MdLogout, MdWavingHand } from "react-icons/md";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/userSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
    const { currentUser } = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get("tab") || "dashboard";

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignout = () => {
        localStorage.removeItem("access_token");
        dispatch(signOut());
        navigate('/signin');
    }

    return (
        <>
            {/* Sidebar for Desktop */}
            <div className="hidden md:flex flex-col justify-between w-[20%] h-screen bg-gray-800 text-white p-5 fixed left-0 top-0">
                <div>
                    <h1 className='font-bold text-2xl tracking-tight text-center text-violet-600 p-2 bg-white rounded-lg'>
                        Xpense<span className='text-zinc-700'>Track</span>
                    </h1>
                    <div className='flex items-center gap-1 text-gray-600 text-xs pt-3'>
                        <MdWavingHand />
                        <p>Hello, </p>
                        <p className='text-gray-500 font-semibold'>{currentUser.email}</p>
                    </div>
                    <ul className="space-y-2 mt-8">
                        <li>
                            <a
                                href={`/?tab=dashboard`}
                                className={
                                    `flex items-center gap-2 px-3 py-2 rounded-md ${activeTab === "dashboard" ? "bg-gray-700 text-yellow-400 font-bold" : "hover:bg-gray-700"
                                    }`
                                }
                            >
                                <LuLayoutDashboard />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={`/?tab=transactions`}
                                className={
                                    `flex items-center gap-2 px-3 py-2 rounded-md ${activeTab === "transactions" ? "bg-gray-700 text-yellow-400 font-bold" : "hover:bg-gray-700"
                                    }`
                                }
                            >
                                <GrTransaction />
                                <span>Transactions</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={`/?tab=expenses`}
                                className={
                                    `flex items-center gap-2 px-3 py-2 rounded-md ${activeTab === "expenses" ? "bg-gray-700 text-yellow-400 font-bold" : "hover:bg-gray-700"
                                    }`
                                }
                            >
                                <GiWallet />
                                <span>Expenses</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={`/?tab=incomes`}
                                className={
                                    `flex items-center gap-2 px-3 py-2 rounded-md ${activeTab === "incomes" ? "bg-gray-700 text-yellow-400 font-bold" : "hover:bg-gray-700"
                                    }`
                                }
                            >
                                <FaCircleDollarToSlot />
                                <span>Incomes</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className='flex flex-col items-center'>
                    <button onClick={handleSignout} className="bg-transparent border-2 border-violet-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                        <MdLogout />
                        <span>Log Out</span>
                    </button>
                    <p className='text-xs text-gray-600 pt-10 text-center'>
                        An application by: <span className='text-sm text-gray-500 font-semibold'>Sudip Ghara</span>
                    </p>
                    <p className='text-xs text-gray-400 text-center'>
                        Portfolio:
                        <a href='https://sudipghara19.github.io/Portfolio/'
                            className='text-sm text-blue-500 font-semibold ml-1'
                            target="_blank"
                            rel="noopener noreferrer">
                            Link
                        </a>
                    </p>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-50">
                <h1 className='font-bold text-lg tracking-tight text-center text-violet-600 p-2 bg-white rounded-lg'>
                    Xpense<span className='text-zinc-700'>Track</span>
                </h1>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
                    {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                </button>
            </div>

            {/* Mobile Sidebar (Slide-in) */}
            <div className={`md:hidden fixed top-0 left-0 w-3/4 h-screen bg-gray-800 text-white p-5 shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-40`}>
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white text-2xl">
                    <AiOutlineClose />
                </button>

                {/* User Info */}
                <div className="pt-14">

                    <div className='flex items-center gap-1 text-gray-400 text-sm pt-3'>
                        <MdWavingHand />
                        <p>Hello, </p>
                        <p className='text-gray-300 font-semibold'>{currentUser.email}</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <ul className="space-y-2 mt-8">
                    <li>
                        <a
                            href={`/?tab=dashboard`}
                            className={
                                `flex items-center gap-2 px-3 py-2 rounded-md ${activeTab === "dashboard" ? "bg-gray-700 text-yellow-400 font-bold" : "hover:bg-gray-700"
                                }`
                            }
                        >
                            <LuLayoutDashboard />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href={`/?tab=transactions`}
                            className={
                                `flex items-center gap-2 px-3 py-2 rounded-md ${activeTab === "transactions" ? "bg-gray-700 text-yellow-400 font-bold" : "hover:bg-gray-700"
                                }`
                            }
                        >
                            <GrTransaction />
                            <span>Transactions</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href={`/?tab=expenses`}
                            className={
                                `flex items-center gap-2 px-3 py-2 rounded-md ${activeTab === "expenses" ? "bg-gray-700 text-yellow-400 font-bold" : "hover:bg-gray-700"
                                }`
                            }
                        >
                            <GiWallet />
                            <span>Expenses</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href={`/?tab=incomes`}
                            className={
                                `flex items-center gap-2 px-3 py-2 rounded-md ${activeTab === "incomes" ? "bg-gray-700 text-yellow-400 font-bold" : "hover:bg-gray-700"
                                }`
                            }
                        >
                            <FaCircleDollarToSlot />
                            <span>Incomes</span>
                        </a>
                    </li>
                </ul>

                {/* Log Out Button */}
                <div className="mt-10">
                    <button onClick={handleSignout} className="w-full bg-transparent border-2 border-violet-700 text-white px-4 py-2 rounded-md flex justify-center items-center gap-2">
                        <MdLogout />
                        <span>Log Out</span>
                    </button>
                </div>

                {/* Footer */}
                <div className="absolute bottom-10 w-full text-center">
                    <p className='text-xs text-gray-600'>
                        An application by: <span className='text-sm text-gray-500 font-semibold'>Sudip Ghara</span>
                    </p>
                    <p className='text-xs text-gray-400'>
                        Portfolio:
                        <a href='https://sudipghara19.github.io/Portfolio/'
                            className='text-sm text-blue-500 font-semibold ml-1'
                            target="_blank"
                            rel="noopener noreferrer">
                            Link
                        </a>
                    </p>
                </div>
            </div>

            {/* Overlay when Mobile Sidebar is Open */}
            {isOpen && <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30" onClick={() => setIsOpen(false)}></div>}
        </>
    );
}

export default Sidebar;
