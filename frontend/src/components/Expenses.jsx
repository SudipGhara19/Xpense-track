import React, { useState } from "react";
import { FaUniversity, FaMobileAlt, FaCreditCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddUpiExpenseModal from "./modals/AddUpiExpenseModal";
import AddCardExpenseModal from "./modals/AddCardExpenseModal";
import AddBankExpenseModal from "./modals/AddBankExpenseModal";

function Expenses() {

    const { transactionData } = useSelector((state) => state.transaction);

    const [isUpi, setIsUpi] = useState(false);
    const [isCard, setIsCard] = useState(false);
    const [isBank, setIsBank] = useState(false);



    return (
        <>
            <div className="w-full h-auto">
                <h1 className="font-bold text-xl text-zinc-600">Add a new expense:</h1>

                {/* ------ Adding options ------- */}
                <div className="w-full h-auto flex flex-col justify-center items-center sm:flex-row sm:justify-center sm:items-center gap-4 mt-3">
                    {/* via UPI */}
                    <div onClick={() => setIsUpi(true)} className="w-full sm:w-1/3 h-24 bg-purple-600 rounded-lg p-4 flex justify-between items-center text-white relative 
                    hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FaMobileAlt size={40} />
                        <h2 className="text-lg font-semibold">UPI Payment</h2>
                    </div>
                    {/* via Bank */}
                    <div onClick={() => setIsBank(true)} className="w-full sm:w-1/3 h-24 bg-purple-600 rounded-lg p-4 flex justify-between items-center text-white relative 
                    hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FaUniversity size={40} />
                        <h2 className="text-lg font-semibold">Bank Transfer</h2>
                    </div>
                    {/* via Card */}
                    <div onClick={() => setIsCard(true)} className="w-full sm:w-1/3 h-24 bg-purple-600 rounded-lg p-4 flex justify-between items-center text-white relative 
                    hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FaCreditCard size={40} />
                        <h2 className="text-lg font-semibold">Card Payment</h2>
                    </div>
                </div>
            </div>

            {isUpi && <AddUpiExpenseModal showModal={isUpi} setShowModal={setIsUpi} />}
            {isCard && <AddCardExpenseModal showModal={isCard} setShowModal={setIsCard} />}
            {isBank && <AddBankExpenseModal showModal={isBank} setShowModal={setIsBank} />}
        </>
    );
}

export default Expenses;
