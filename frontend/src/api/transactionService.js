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