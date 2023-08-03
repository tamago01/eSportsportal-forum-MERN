import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState(null);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      // Call the server endpoint to reset the password
      const response = await axios.post("http://localhost:4000/api/user/reset-password", { email });

      if (response.status === 200) {
        // Update the temporaryPassword state with the received value
        setTemporaryPassword(response.data.temporaryPassword);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email below to receive a temporary password:</p>
      <input className="form-input text-black" type="text" placeholder="Enter Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className={`py-1 px-4 bg-primary rounded-lg text-white ${loading ? "opacity-50" : ""}`} onClick={handleResetPassword} disabled={loading}>
        {loading ? "Sending..." : "Send Temporary Password"}
      </button>

      {/* Display the temporary password if it exists */}
      {temporaryPassword && (
        <div>
          <h2>Temporary Password</h2>
          <p>Your temporary password is:</p>
          <p>{temporaryPassword}</p>
          <p>Please login with this temporary password and reset your password after logging in.</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
