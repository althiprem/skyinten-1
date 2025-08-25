import React from "react";

export const Payment = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_yourTestKeyHere", // Replace with your Razorpay TEST key
      amount: 999, // in paise = ₹499
      currency: "INR",
      name: "Skyintern",
      description: "Unlock All Features",
      image: "/logo.png", // optional logo
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        localStorage.setItem("isPaidUser", "true");
        // redirect or reload to unlock features
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      notes: {
        purpose: "Course Access",
      },
      theme: {
        color: "#0f172a",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <p className="text-gray-600 mb-6"> </p>
        <button
          onClick={handlePayment}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Pay ₹499
        </button>
      </div>
    </div>
  );
};

