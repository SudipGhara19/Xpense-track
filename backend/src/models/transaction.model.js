import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  budget: { type: Number, default: 0 }, // Single budget per user
  transactions: {
    type: [
      {
        transactionId: { type: String, required: true }, // Unique ID as a string
        description: { type: String, trim: true },
        amount: { type: Number, required: true },
        type: { type: String, enum: ["income", "expense"], required: true },
        category: { type: String, trim: true },
        tranInfo: {
          method: { type: String, enum: ["UPI", "Bank", "Card"], required: true },

          // UPI details
          upiId: {
            type: String,
            validate: {
              validator: function () {
                return this.method === "UPI" ? !!this.upiId : true;
              },
              message: "UPI ID is required for UPI transactions.",
            },
          },

          // Bank details
          accountNumber: {
            type: String,
            validate: {
              validator: function () {
                return this.method === "Bank" ? !!this.accountNumber : true;
              },
              message: "Account number is required for bank transactions.",
            },
          },
          accountName: {
            type: String,
            validate: {
              validator: function () {
                return this.method === "Bank" ? !!this.accountName : true;
              },
              message: "Account name is required for bank transactions.",
            },
          },

          // Card details
          cardNumber: {
            type: String,
            validate: {
              validator: function () {
                return this.method === "Card" ? !!this.cardNumber : true;
              },
              message: "Card number is required for card transactions.",
            },
          },
          cardHolderName: {
            type: String,
            validate: {
              validator: function () {
                return this.method === "Card" ? !!this.cardHolderName : true;
              },
              message: "Cardholder name is required for card transactions.",
            },
          },

          // Common field for all methods
          time: { type: Date, default: Date.now, required: true },
        },
        date: { type: Date, default: Date.now },
      },
    ],
    default: [], // Default value: Empty array (No transactions initially)
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
