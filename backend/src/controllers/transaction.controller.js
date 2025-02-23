import Transaction from "../models/transaction.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";


// ---------------------------------------- get transaction data ----------------------------
export const getData = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!req.user) {
            return next(new ErrorHandler(401, "Unauthorized, You are not allowed to perform this task."))
        }

        const budgetData = await Transaction.findOne({user: userId});

        if(!budgetData){
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