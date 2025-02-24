import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTransaction } from "../../api/transactionService";
import { setTransactionData } from "../../redux/transactionSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { FaCheck } from "react-icons/fa";

function AddCardIncomeModal({ showModal, setShowModal }) {
    const { transactionData } = useSelector((state) => state.transaction);
    const [loading, setLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const dispatch = useDispatch();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolderName, setcardHolderName] = useState("");

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!description || !amount || !category || !cardNumber || !cardHolderName) {
                toast.error("Please fill all the fields.");
                setLoading(false);
                return;
            }

            const reqBody = {
                method: "Card",
                type: "income",
                description,
                amount,
                category,
                cardNumber,
                cardHolderName
            };

            const userId = transactionData.user;
            const response = await addTransaction(userId, reqBody);

            if (response?.error) {
                return;
            }

            dispatch(setTransactionData(response.budget));
            toast.success("New income transaction added successfully.");
            setIsAdded(true);

            setTimeout(() => {
                setShowModal(false);
            }, 2000);

        } catch (error) {
            console.log(error);
            toast.error("Error in adding transaction. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        "Salary",
        "Investments",
        "Salary",
        "Business",
        "Freelance",
        "Gifts",
        "Split Bills",
        "Cashbacks",
        "Others"
    ]

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    <IoMdClose />
                </button>

                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Add Card Income
                </h2>

                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Category</option>
                        {categories.map((C, i) => 
                        <option key={i} value={C}>{C}</option>
                        )}
                    </select>

                    <input
                        type="text"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        placeholder="Card Holder Name"
                        value={cardHolderName}
                        onChange={(e) => setcardHolderName(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex justify-center mt-4">
                    {isAdded ?
                        <div className="bg-green-600 px-4 py-2 rounded-md text-white flex justify-center items-center gap-2">
                            <FaCheck />
                            <span>Done</span>
                        </div>
                        :
                        <button
                            disabled={loading}
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            {loading ?
                                <div className="flex justify-center items-center gap-2">
                                    <ClipLoader
                                        color="#ffffff"
                                        size={18}
                                        speedMultiplier={1}
                                    />
                                    <span>Adding...</span>
                                </div>
                                : 'Add'}
                        </button>}
                </div>
            </div>
        </div>
    );
}

export default AddCardIncomeModal;