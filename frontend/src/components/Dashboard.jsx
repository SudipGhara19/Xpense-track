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

function Dashboard() {

    const { currentUser } = useSelector((state) => state.user);
    const { transactionData } = useSelector((state) => state.transaction);

    const [isSetBudget, setIsSetBudget] = useState(false);
    const [budget, setBudget] = useState(transactionData?.budget)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    //------------------------------- Get Transaction Data ----------------------
    const handleGetData = async () => {
        try {
            setLoading(true);
            const response = await getTransactionData(currentUser._id);

            if (response?.error) {
                toast.error(response.error || "Can not able to fetch data. Try again later.");
                return;
            }
            dispatch(setTransactionData(response.budget));
        } catch (error) {
            console.log(error);
            toast.error("Can not able to fetch the data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetData();
    }, [])

    return (
        <>
            {
                loading ? <div className="w-full h-full flex justify-center items-center">
                    <ClipLoader
                        color="#930abe"
                        size={42}
                        speedMultiplier={1}
                    />
                </div>
                    :
                    <div className="w-full h-auto py-5">

                        {/* Info Cards */}
                        <div className="w-full h-auto flex flex-col justify-center items-center sm:flex-row sm:justify-center sm:items-center gap-4">

                            {/* Budget */}
                            <div className="w-full sm:w-1/3 h-32 bg-yellow-300 rounded-lg p-4 flex justify-between items-start relative">
                                <div className="h-full flex flex-col justify-between gap-2">
                                    <MdAttachMoney className="text-3xl text-yellow-700" />
                                    <h2 className="text-lg text-white font-semibold">Budget</h2>
                                </div>
                                <span className="text-3xl font-bold text-white">{transactionData?.budget}</span>
                                <button onClick={() => setIsSetBudget(true)} className="absolute bottom-3 right-3 p-2 rounded-full bg-yellow-500 text-white hover:scale-110 transition-transform">
                                    <MdEdit className="text-2xl" />
                                </button>
                            </div>

                            {/* Total Transactions */}
                            <div className="w-full sm:w-1/3 h-32 bg-sky-400 rounded-lg p-4 flex justify-between items-start relative">
                                <div className="h-full flex flex-col justify-between gap-2">
                                    <FaExchangeAlt className="text-3xl text-sky-800" />
                                    <h2 className="text-lg text-white font-semibold">Total Transactions</h2>
                                </div>
                                <span className="text-3xl font-bold text-white">{transactionData?.transactions?.length}</span>
                                <NavLink to="/?tab=transactions" className="absolute bottom-3 right-3 p-2 rounded-full bg-sky-500 text-white hover:scale-110 transition-transform">
                                    <MdArrowForward className="text-2xl" />
                                </NavLink>
                            </div>

                            {/* Remaining Amount */}
                            <div className="w-full sm:w-1/3 h-32 bg-green-400 rounded-lg p-4 flex justify-between items-start relative">
                                <div className="h-full flex flex-col justify-between gap-2">
                                    <BiWallet className="text-3xl text-green-800" />
                                    <h2 className="text-lg text-white font-semibold">Remaining Amount</h2>
                                </div>
                                <span className="text-3xl font-bold text-white">7,50,000</span>

                            </div>

                        </div>
                    </div>
            }

            {isSetBudget && <SetBudgetModal
                showModal={setIsSetBudget}
                setBudget={setBudget}
                budget={budget} />}
        </>
    );
}

export default Dashboard;
