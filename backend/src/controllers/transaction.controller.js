import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";


// ---------------------------------------- get transaction data ----------------------------
export const getData = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!req.user) {
            return next(new ErrorHandler(401, "Unauthorized, You are not allowed to perform this task."))
        }

        const budgetData = await Transaction.findOne({ user: userId });

        if (!budgetData) {
            return next(new ErrorHandler(404, "No transaction data found."))
        }

        res.status(200).json({ message: "Budget updated successfully", budget: budgetData });
    } catch (error) {
        next(new ErrorHandler(500, "Internal server error"));
    }
}


//--------------------------------------------- UPDATE BUDGET CONTROLLER -------------------------------------------
export const updateBudget = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { budget } = req.body;

        if (!req.user) {
            return next(new ErrorHandler(401, "Unauthorized, You are not allowed to perform this task."))
        }

        if (!budget || isNaN(budget)) {
            return next(new ErrorHandler(400, "Invalid budget value"));
        }

        const updatedTransaction = await Transaction.findOneAndUpdate(
            { user: userId },
            { $set: { budget } },
            { new: true }
        );

        if (!updatedTransaction) {
            return next(new ErrorHandler(404, "Transaction document not found"));
        }

        res.status(200).json({ message: "Budget updated successfully", budget: updatedTransaction });
    } catch (error) {
        next(new ErrorHandler(500, "Internal server error"));
    }
};


//-------------------------------------------- ADD TRANSACTION EXPENSE/INCOME ---------------------------------------
export const addTransaction = async (req, res, next) => {
    try {
        const { userId } = req.params; // Get user ID from request parameters
        const { description, amount, type, category, method, upiId, accountNumber, accountName, cardNumber, cardHolderName } = req.body;

        console.log("Incoming request body:", req.body);
        console.log("User ID:", userId);

        // Check if user is authenticated
        if (!req.user) {
            return next(new ErrorHandler(401, "Unauthorized, You are not allowed to perform this task."));
        }

        // Validate required fields
        if (!description || !amount || !type || !category || !method) {
            return next(new ErrorHandler(400, "Missing required fields."));
        }

        // Validate method-specific fields
        let tranInfo = { method, time: new Date() };

        switch (method) {
            case "UPI":
                if (!upiId) {
                    return next(new ErrorHandler(400, "UPI ID is required for UPI transactions."));
                }
                tranInfo.upiId = upiId;
                break;

            case "Bank":
                if (!accountNumber || !accountName) {
                    return next(new ErrorHandler(400, "Account number and account name are required for bank transactions."));
                }
                tranInfo.accountNumber = accountNumber;
                tranInfo.accountName = accountName;
                break;

            case "Card":
                if (!cardNumber || !cardHolderName) {
                    return next(new ErrorHandler(400, "Card number and cardholder name are required for card transactions."));
                }
                tranInfo.cardNumber = cardNumber;
                tranInfo.cardHolderName = cardHolderName;
                break;

            default:
                return next(new ErrorHandler(400, "Invalid transaction method."));
        }

        // Ensure userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(new ErrorHandler(400, "Invalid User ID format."));
        }

        // Find or create transaction document for the user
        let transactionDoc = await Transaction.findOne({ user: userId });

        if (!transactionDoc) {
            transactionDoc = new Transaction({
                user: userId,
                transactions: []
            });
        }

        // Create new transaction object
        const newTransaction = {
            transactionId: new mongoose.Types.ObjectId().toString(), // Generate unique transaction ID
            description,
            amount: Number(amount), // Ensure amount is a number
            type,
            category,
            tranInfo,
            date: new Date(),
        };

        // Ensure transactions array exists before pushing
        if (!transactionDoc.transactions) {
            transactionDoc.transactions = [];
        }

        // Add the transaction to the document
        transactionDoc.transactions.push(newTransaction);

        // Save the updated transaction document
        await transactionDoc.save();


        // Return the updated transaction document
        res.status(201).json({ message: "Transaction added successfully", budget: transactionDoc });

    } catch (error) {
        console.error("Server Error:", error);
        next(new ErrorHandler(500, error.message || "Internal Server Error"));
    }
};
