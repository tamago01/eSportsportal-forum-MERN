import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import KhaltiConfig from "./KhaltiConfig";

const Khalti = () => {
  let checkout = new KhaltiCheckout(KhaltiConfig);

  return (
    <div>
      <button onClick={() => checkout.show({ amount: 19990 })} className="px-2 py-2 bg-teal-400 hover:bg-teal-500 text-white font-semibold rounded-lg shadow-md">
        Request
      </button>
    </div>
  );
};

export default Khalti;
