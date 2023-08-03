import axios from "axios";
// import fetch from 'fetch';
const khaltiResCode = 0;

let config = {
  // replace this key with yours
  publicKey: "test_public_key_b7c95cebf3d345c3aa3bdb69274f9193",
  productIdentity: "1554",
  productName: "test app",
  productUrl: "https://localhost:3000",
  eventHandler: {
    async onSuccess(payload) {
      // hit merchant api for initiating verfication
      // console.log(payload);

      let data = {
        token: payload.token,
        amount: payload.amount,
        customer_info: {
          name: "John doe",
          email: "example@gmail.com",
          phone: "9811496763",
        },
      };

      let config = {
        headers: {
          Authorization: "test_secret_key_dbd9c18c21b14c869258b12f45f628e3",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/plain",
        },
      };

      const response = await fetch("https://khalti.com/api/v2/payment/verify/", {
        method: "POST",
        mode: "no-cors",
        // caches: 'no-cache',
        withCredentials: true,
        credentials: "same-origin",
        body: JSON.stringify(data),
        headers: config.headers,
      });
      if (response.status === khaltiResCode) {
        // alert("Payment Successful")
        const parsedData = "Test";
        axios
          .post("http://localhost:4000/api/coach/make-request", data)
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              alert("Request is made");
              window.location.reload();
            } else {
              alert("Fail vayo");
            }
          })
          .catch((err) => {
            alert("Something went wrong");
          });
        console.log("success");
      } else {
        console.log("failed");
        alert("Payment Failed");
      }
    },

    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;
