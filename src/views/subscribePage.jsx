import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { baseUrl } from "../constants/helpers";

const Subscribe = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const schoolData = location.state;

  console.log(`Settlement Bank Code: ${schoolData.schoolData.settlementBankCode}`)
  console.log(`Sub account code: ${schoolData.schoolData.subAccountCode}`)

  console.log(`School Data: `, schoolData);

  useEffect(() => {
    if (!schoolData) {
      navigate("/login");
    } else {
      console.log(`School emails: ${JSON.stringify(schoolData.schoolData.schoolEmail)}`);
    }
  }, [schoolData, navigate]);

  const handlePayment = async () => {
    
    try {
      


      const res = await axios.post(`${baseUrl}paystack/initialize`, {
        email: schoolData.schoolData.schoolEmail,
        amount: 0.01,
      });

      const { authorization_url, reference } = res.data.data;

      

      localStorage.setItem("pendingSchool", JSON.stringify(schoolData));
      localStorage.setItem("paystackRef", reference);

      window.location.href = authorization_url;
    } catch (err) {
      console.error("Payment Error", err);
      alert("Unable to start payment.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Complete Your Subscription</h1>
          <p className="mt-2 text-gray-600">
            Hello <span className="font-medium text-indigo-600">{schoolData.schoolData.schoolName}</span>, get started with all features by making a subscription.
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What You Get</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">✓</span> Full school management features
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">✓</span> Add unlimited students & fees
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">✓</span> Backups
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">✓</span> One-time registration fee: <span className="font-semibold text-gray-900">GHS 0.1</span>
            </li>
          </ul>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg py-3 rounded-lg transition duration-300 shadow-md"
        >
          Pay GHS 0.1 & Subscribe
        </button>

        <p className="mt-6 text-sm text-center text-gray-500">
          Need assistance? <a href="https://wa.me/233542384752" target="_blank" className="text-indigo-600 underline hover:text-indigo-500">Chat on WhatsApp</a>
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
