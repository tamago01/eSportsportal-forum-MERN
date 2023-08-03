import axios from "axios";
import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "./middlewares/User-state";
function Khalti() {
  const { data } = useContext(UserContext);
  const navigate = useNavigate();
  const initiatePayment = async () => {
    try {
      console.log(data);
      const response = await axios({
        method: "POST",
        headers: {
          Authorization: "Key 73ad681a9e0f4cbfada5d7c497be2831",
        },
        url: "http://localhost:4000/khalti",
        data: {
          return_url: "http://localhost:3000/khalti/confirm",
          website_url: "http://localhost:3000",
          amount: 20000,
          purchase_order_id: "coachReq1001",
          purchase_order_name: "Coaching Request",
          customer_info: {
            name: data?.signed_user?.username,
            email: data?.signed_user?.email,
            phone: "9818610437",
          },
          amount_breakdown: [
            {
              label: "Mark Price",
              amount: 17000,
            },
            {
              label: "VAT",
              amount: 3000,
            },
          ],
          product_details: [
            {
              identity: "1234567890",
              name: "Khalti logo",
              total_price: 20000,
              quantity: 1,
              unit_price: 20000,
            },
          ],
        },
      });
      console.log(response);

      if (response.status === 200) {
        const redirectURI = response.data.payment_url;

        window.location.href = redirectURI;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={initiatePayment} className="bg-purple-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md shadow-md">
        Khalti
      </button>
    </div>
  );
}

export default Khalti;
