import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    transactionData: null,
}


const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransactionData: (state, action) => {
            state.transactionData = action.payload;
        },

        removeTransactionData: (state) => {
            state.transactionData = null;
        }

        
    }
});


export const { setTransactionData, removeTransactionData} = transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;