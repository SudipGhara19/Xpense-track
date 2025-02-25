import React from "react";
import { IoMdClose } from "react-icons/io";

function TransactionDetailsModal({ showModal, setShowModal, tnx }) {
  if (!showModal || !tnx) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          <IoMdClose />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4 capitalize">
          {tnx.type} Details
        </h2>

        <div className="space-y-3">
          <div className="flex flex-col justify-start items-center">
            <p className="text-4xl text-zinc-700 font-bold text-center">₹{tnx.amount}</p>
            <p className="text-gray-400 text-[10px] text-center">{new Date(tnx.date).toLocaleDateString()}</p>
            <p className="text-gray-500 text-[11px] text-center">Transaction Id: <span className="font-semibold">{tnx.transactionId}</span></p>
            <p className="text-white inline-block  bg-gray-500 text-sm  px-4 rounded-full">{tnx.category}</p>
          </div>
          <p>Description: <strong>{tnx.description}</strong></p>
          <p>Payment Method:<strong> Via {tnx.tranInfo.method}</strong></p>
          {tnx.tranInfo.cardNumber && <p>Card Number:<strong> **** **** **** {tnx.tranInfo.cardNumber.slice(-4)}</strong></p>}
          {tnx.tranInfo.cardHolderName && <p>Card Holder: <strong>{tnx.tranInfo.cardHolderName}</strong></p>}
          {tnx.tranInfo.upiId && <p>UPI ID: <strong>{tnx.tranInfo.upiId}</strong></p>}
          {tnx.tranInfo.accountNumber && <p>Account Number:<strong> **** **** ****{tnx.tranInfo.accountNumber.slice(-4)}</strong></p>}
          {tnx.tranInfo.accountName && <p>Account Holder Name: <strong>{tnx.tranInfo.accountName}</strong></p>}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailsModal;
