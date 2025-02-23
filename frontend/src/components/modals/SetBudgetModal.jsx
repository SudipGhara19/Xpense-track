import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from 'react-icons/io'
import { setTransactionData } from '../../redux/transactionSlice.js'
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { updateBudget } from "../../api/transactionService.js";



function SetBudgetModal({ showModal, budget, setBudget }) {

    const { transactionData } = useSelector((state) => state.transaction);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    // -------------------------------------- setting the Budget -------------------------------
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await updateBudget({ userId: transactionData.user, budget: budget });
            if (response?.error) {
                toast.error(response.error || "Can not able update. Try again later.");
                return;
            }
            dispatch(setTransactionData(response.budget));
            toast.success("Budget updated successfully.")
            setIsUpdated(true);
            setLoading(false);
            setTimeout(() => {
                showModal(false);
            }, 2000)
        } catch (error) {
            console.log(error);
            toast.error("Couldn't able to update data.");
        } finally {
            setLoading(false);
        }
    }

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] min-h-[250px] max-w-md shadow-lg relative">
                {/* Close Button */}
                <button
                    onClick={() => showModal(false)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    <IoMdClose />
                </button>

                {/* Modal Content */}
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Set Your Budget
                </h2>

                {/* Budget Value Display */}
                <p className="text-center text-lg font-bold text-gray-700 mb-2">
                    ₹{budget.toLocaleString()}
                </p>

                {/* Slider (Steps of 1,000) */}
                <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    disabled={loading}
                />

                {/* Budget Range Labels */}
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>₹1,000</span>
                    <span>₹5,00,000</span>
                </div>

                {/* Centered Button */}
                <div className="flex justify-center mt-4">
                    {isUpdated ? <div className="bg-green-600 px-4 py-2 rounded-md text-white flex justify-center items-center gap-2">
                        <FaCheck />
                        <span>Done</span>
                    </div>
                        :
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            {loading ?
                                <div className="flex justify-center items-center gap-2">
                                    <ClipLoader
                                        color="#ffffff"
                                        size={18}
                                        speedMultiplier={1}
                                    />
                                    <span>Updating...</span>
                                </div>
                                : 'Update'}
                        </button>}
                </div>
            </div>
        </div>
    );
}

export default SetBudgetModal;
