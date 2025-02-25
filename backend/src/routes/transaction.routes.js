import express from 'express';
import { addTransaction, deleteTransaction, getData, updateBudget } from '../controllers/transaction.controller.js';
import { verifyToken } from '../utils/verifyToken.js';


const transactionRouter = express.Router();

transactionRouter.get('/getData/:userId', verifyToken, getData);
transactionRouter.put('/update-budget/:userId', verifyToken, updateBudget);
transactionRouter.post('/add/:userId', verifyToken, addTransaction);
transactionRouter.delete('/delete/:userId/:transactionId', verifyToken, deleteTransaction);


export default transactionRouter;