import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { userReducer } from "./userSlice.js";
import { transactionReducer } from "./transactionSlice.js";

const rootReducer = combineReducers({
    user: userReducer,
    transaction: transactionReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);