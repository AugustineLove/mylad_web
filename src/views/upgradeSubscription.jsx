import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { baseUrl } from "../constants/helpers";
import { useSchool } from "../context/schoolContext";

const UpgradeSubscription = () => {
  const navigate = useNavigate();
  const { school } = useSchool();

  const handleUpgrade = async () => {
    try {
      const res = await axios.post(`${baseUrl}paystack/initialize`, {
        email: school.school_email,
        amount: 200, // Update this to your actual upgrade fee
        callBack: "http://localhost:5173/dashboard/upgradeCallback"
      });

      const { authorization_url, reference } = res.data.data;

      localStorage.setItem("paystackRef", reference);
      localStorage.setItem("upgradingSchool", JSON.stringify(school));

      window.location.href = authorization_url;
    } catch (err) {
      console.error("Upgrade Error:", err);
      alert("Unable to start upgrade process.");
    }
  };

  if (!school) {
    return <div className="text-center py-10">Loading school info...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Upgrade Your Subscription</h1>
          <p className="mt-2 text-gray-600">
            Hello <span className="font-medium text-indigo-600">{school.schoolName}</span>, your current subscription has expired. Kindly upgrade to continue using the system.
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Benefits</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">✓</span> Continuous access to school management tools
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">✓</span> Data backups and support
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">✓</span> Upgrade Fee: <span className="font-semibold text-gray-900">GHS 200</span>
            </li>
          </ul>
        </div>

        <button
          onClick={handleUpgrade}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg py-3 rounded-lg transition duration-300 shadow-md"
        >
          Pay GHS 200 & Upgrade
        </button>

        <p className="mt-6 text-sm text-center text-gray-500">
          Need help?{" "}
          <a
            href="https://wa.me/233542384752"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline hover:text-indigo-500"
          >
            Chat on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
};

export default UpgradeSubscription;
