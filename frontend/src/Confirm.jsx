import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Confirm = () => {
  const params = useParams();
  console.log(params);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  console.log(searchParams);

  // Extracting the values using the keys
  const pidx = searchParams.get("pidx");
  const txnId = searchParams.get("txnId");
  const amount = searchParams.get("amount");
  const mobile = searchParams.get("mobile");
  const purchaseOrderId = searchParams.get("purchase_order_id");
  const purchaseOrderName = searchParams.get("purchase_order_name");
  const transactionId = searchParams.get("transaction_id");

  return (
    <div className="bg-gradient-to-b from-purple-900 to-orange-400 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white bg-gradient-to-b from-purple-800 to-orange-300 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Confirmation Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-teal-900 font-semibold">pidx:</p>
            <p className="text-teal-900">{pidx}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-teal-900 font-semibold">txnId:</p>
            <p className="text-teal-900">{txnId}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-teal-900 font-semibold">amount:</p>
            <p className="text-teal-900">{amount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-teal-900 font-semibold">mobile:</p>
            <p className="text-teal-900">{mobile}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 col-span-2">
            <p className="text-teal-900 font-semibold">purchase_order_id:</p>
            <p className="text-teal-900">{purchaseOrderId}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 col-span-2">
            <p className="text-teal-900 font-semibold">purchase_order_name:</p>
            <p className="text-teal-900">{purchaseOrderName}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 col-span-2">
            <p className="text-teal-900 font-semibold">transaction_id:</p>
            <p className="text-teal-900">{transactionId}</p>
          </div>
        </div>
      </div>
      <Link to="/" className="mt-4">
        <button className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-md shadow-md">Confirm</button>
      </Link>
    </div>
  );
};

export default Confirm;
