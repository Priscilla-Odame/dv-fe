"use client";
import { useState } from "react";
import axios from "axios";
import { BASE_URL, CLIENT_BASE_URL } from "@/helpers/route";

export default function PaymentForm()  {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!email || !amount) {
      alert("Please enter both email and amount.");
      return;
    }

    setLoading(true);

    try {
      // Call the backend to initialize the transaction
      const response = await axios.post(`${BASE_URL}payment/transaction`, {
        email,
        amount,
        callback_url: `${CLIENT_BASE_URL}orders`
      });

      const { authorization_url } = response.data;
      window.location.href = authorization_url; // Redirect to Paystack's payment page
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Failed to initialize payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Enter amount (e.g., 1000)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 rounded-md"
        />
        <button
          onClick={handlePayment}
          className={`px-4 py-2 rounded-md ${
            loading ? "bg-gray-500" : "bg-blue-500"
          } text-white`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};
