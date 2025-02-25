import { toast } from "react-toastify";
import API from "./api";

//---------------------------------- Get Transaction Data -------------------------------
export const getTransactionData = async (userId) => {
    try {
        const response = await API.get(`/transaction/getData/${userId}`,);

        // If update is successful, return response data
        if (response.status === 200) {
            return response.data;
        }

        // This block should not execute under normal conditions
        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.log("Update Budget Error:", error); // Log full error object

        const statusCode = error.response?.status;
        const errorMsg = error.response?.data?.message || "Failed to get transaction data. Please try again.";


        if (statusCode === 404) {
            toast.error("Transaction data not found");
            return;
        }

        if (statusCode === 401) {
            toast.error("unauthorized, go back.");
            return;
        }

        toast.error(errorMsg); // Show error message
        return;
    }
}


// --------------------------------- Update Budget ------------------------------------
export const updateBudget = async (data) => {
    try {
        const { userId, budget } = data;
        const response = await API.put(`/transaction/update-budget/${userId}`, { budget });

        // If update is successful, return response data
        if (response.status === 200) {
            return response.data;
        }

        // This block should not execute under normal conditions
        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.log("Update Budget Error:", error); // Log full error object

        const statusCode = error.response?.status;
        const errorMsg = error.response?.data?.message || "Failed to update budget. Please try again.";

        if (statusCode === 400) {
            toast.error("Invalid budget value.");
            return { error: "Invalid budget value." };
        }

        if (statusCode === 404) {
            toast.error("User not found.");
            return { error: "User not found." };
        }

        if (statusCode === 401) {
            toast.error("unauthorized, go back.");
            return { error: "unauthorized, go back." };
        }

        toast.error(errorMsg); // Show error message
        return { error: errorMsg };
    }
};



//--------------------------------- add new transaction -------------------------------
export const addTransaction = async (userId, reqBody) => {
    try {
        const response = await API.post(`/transaction/add/${userId}`, { ...reqBody });

        // If update is successful, return response data
        if (response.status === 201) {
            return response.data;
        }

        // This block should not execute under normal conditions
        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.log("New Transaction adding Error:", error); // Log full error object

        const statusCode = error.response?.status;
        const errorMsg = error.response?.data?.message || "Failed to add new transaction. Please try again.";

        if (statusCode === 400) {
            toast.error("Invalid transaction details.");
            return { error: "Invalid transaction details." };
        }

        if (statusCode === 404) {
            toast.error("Transaction document not found.");
            return { error: "Transaction document not found." };
        }

        if (statusCode === 401) {
            toast.error("unauthorized, go back.");
            return { error: "unauthorized, go back." };
        }

        toast.error(errorMsg); // Show error message
        return { error: errorMsg };
    }
}


//---------------------------------Delete Transaction -----------------------------
export const deleteTransaction = async (userId, transactionId) => {
    try {
        const response = await API.delete(`/transaction/delete/${userId}/${transactionId}`);

        // If update is successful, return response data
        if (response.status === 200) {
            return response.data;
        }

        // This block should not execute under normal conditions
        toast.error("Unexpected response from server.");
        return { error: "Unexpected response. Please try again." };

    } catch (error) {
        console.log("Error in deleting transaction:", error); // Log full error object

        const statusCode = error.response?.status;
        const errorMsg = error.response?.data?.message || "Failed to delete transaction. Please try again.";

        if (statusCode === 400) {
            toast.error("Invalid User Id details.");
            return { error: "Invalid User Id details." };
        }

        if (statusCode === 404) {
            toast.error("Transaction document not found");
            return { error: "Transaction document not found" };
        }

        if (statusCode === 401) {
            toast.error("unauthorized, go back.");
            return { error: "unauthorized, go back." };
        }

        toast.error(errorMsg); // Show error message
        return { error: errorMsg };
    }
}