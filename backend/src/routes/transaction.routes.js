import express from 'express';
import { getData, updateBudget } from '../controllers/transaction.controller.js';
import { verifyToken } from '../utils/verifyToken.js';


const transactionRouter = express.Router();

transactionRouter.get('/getData/:userId', verifyToken, getData);
transactionRouter.put('/update-budget/:userId', verifyToken, updateBudget);


export default transactionRouter;