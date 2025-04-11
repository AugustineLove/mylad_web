import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AppButton from "../components/button";
import NavBar from "../components/navBar";
import { baseUrl } from "../constants/helpers";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [availableBanks, setAvailableBanks] = useState([]);
  const [accountHolderName, setAccountHolderName] = useState(""); // Store account holder name
  const [bankofChoice, setBankOfChoice] = useState(""); // Store bank of choice

  useEffect(() => {
    if (isSignUp) {
      const fetchBanks = async () => {
        try {
          const response = await fetch(`${baseUrl}paystack/getBanks`);
          const data = await response.json();
          console.log(`Data: ${JSON.stringify(data)}`);
          if (data && data.status) {
            setAvailableBanks(data.data);
          } else {
            console.error("Failed to fetch banks:", data.message || "Unknown error");
          }
        } catch (error) {
          console.error("Error fetching banks:", error);
        }
      };
      fetchBanks();
    }
  }, [isSignUp]);

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolAddress: "",
    schoolPhone: "",
    schoolWebsite: "",
    schoolEmail: "",
    schoolPassword: "",
    paymentMethod: "bank", // default to bank
    bankName: "",
    bankAccountNumber: "",
    settlementBankCode: "",
    mobileMoneyProvider: "",
    mobileMoneyNumber: "",
    subAccountCode: "",
    accountHolderName: accountHolderName,
  });
  const momoProviders = [
    "MTN",
    "Telecel",
    "AirtelTigo"
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If selecting a bank name, find the code
    if (name === "bankName") {
      const selectedBank = availableBanks.find((bank) => bank.name === value);
      setBankOfChoice(selectedBank);
      setFormData((prevData) => ({
        ...prevData,
        bankName: value,
        settlementBankCode: selectedBank?.code || "", // safely assign code
      }));
    } else if (name === "bankAccountNumber") {
      setFormData((prevData) => ({
        ...prevData,
        bankAccountNumber: value,
      }));

      // Fetch account holder name when bank account number is entered
      fetchAccountHolderName(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fetchAccountHolderName = async (accountNumber) => {
    // Check if the account number is 13 digits long
    if (accountNumber.length < 10) {
      setAccountHolderName("Account number must be exactly 13 digits long");
      return;
    }
  
    try {
      const response = await fetch(`${baseUrl}paystack/getAccountHolderName?accountNumber=${accountNumber}&bankCode=${bankofChoice?.code}`);
      const data = await response.json();
      if (data) {
        setAccountHolderName(data.accountHolderName);
      } else {
        setAccountHolderName("Account holder not found");
      }
    } catch (error) {
      console.error("Error fetching account holder name:", error);
      setAccountHolderName("Error fetching account holder name");
    }
  };
  

  const handlePaymentMethodChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignUp
        ? ""
        : `${baseUrl}schools/login`;

      const payload = {
        schoolWebsite: formData.schoolWebsite,
        schoolEmail: formData.schoolEmail,
        schoolPassword: formData.schoolPassword,
      };

      if (isSignUp) {
        Object.assign(payload, {
          schoolName: formData.schoolName,
          schoolAddress: formData.schoolAddress,
          schoolPhone: formData.schoolPhone,
        });

        if (formData.paymentMethod === "bank") {
          Object.assign(payload, {
            bankName: formData.bankName,
            bankAccountNumber: formData.bankAccountNumber,
            settlementBankCode: formData.settlementBankCode, // <-- Add this
          });
        } else {
          Object.assign(payload, {
            mobileMoneyProvider: formData.mobileMoneyProvider,
            mobileMoneyNumber: formData.mobileMoneyNumber,
          });
        }
      }

      if (isSignUp) {
        navigate("/subscribe", { state: { schoolData: formData } });
      } else {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const schoolData = await response.json();

        if (response.ok) {
          localStorage.setItem("authToken", schoolData.authToken);
          localStorage.setItem("schoolId", schoolData.schoolId);
          localStorage.setItem("schoolName", schoolData.schoolName);
          navigate("/dashboard");
          window.location.reload();
        } else {
          alert(`Error: ${schoolData.message}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen w-full bg-gradient-to-r from-gray-1000 to-gray-100 flex items-center justify-center px-4 py-16 overflow-auto">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 sm:p-10 z-10 relative">
          <div className="flex justify-center mb-6">
            <img src="Asset 2.png" alt="Logo" className="h-14 w-auto" />
          </div>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
            {isSignUp ? "Create an Account" : "Sign in to Manage!"}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              className="text-indigo-600 font-medium cursor-pointer underline hover:text-indigo-400"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign in here." : "Sign up here."}
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <>
                <Input
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="School Name"
                />
                <Input
                  name="schoolAddress"
                  value={formData.schoolAddress}
                  onChange={handleChange}
                  placeholder="School Address"
                />
                <Input
                  name="schoolPhone"
                  value={formData.schoolPhone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
                <Input
                  name="schoolWebsite"
                  value={formData.schoolWebsite}
                  onChange={handleChange}
                  placeholder="Website"
                />

                {/* Payment Method Selection */}
                <div className="pt-4">
                  <label className="block text-black-700 font-bold text-2xl mb-5">School Account</label>
                  <div className="flex space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={handlePaymentMethodChange}
                      />
                      Bank Account
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobileMoney"
                        checked={formData.paymentMethod === "mobileMoney"}
                        onChange={handlePaymentMethodChange}
                      />
                      Mobile Money
                    </label>
                  </div>
                </div>

                {/* Bank Details */}
                {formData.paymentMethod === "bank" && (
                  <>
                    <div>
                      <label className="block text-gray-700">Select Bank</label>
                      <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className="w-full p-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                        required
                      >
                        <option value="">Select Bank</option>
                        {availableBanks.map((bank, index) => (
                          <option key={index} value={bank.name}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                      placeholder="Bank Account Number"
                    />
                    {/* Display account holder name */}
                    {accountHolderName && (
                      <p className="text-green-500 mt-2">
                        Account Holder: {accountHolderName}
                      </p>
                    )}
                  </>
                )}
                {/* Mobile Money Details */}
                {formData.paymentMethod === "mobileMoney" && (
                  <>
                    <div>
                      <label className="block text-gray-700">Select Momo Provider</label>
                      <select
                        name="mobileMoneyProvider"
                        value={formData.mobileMoneyProvider}
                        onChange={handleChange}
                        className="w-full p-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                        required
                      >
                        <option value="">Select Momo Provider</option>
                        {momoProviders.map((provider, index) => (
                          <option key={index} value={provider}>
                            {provider}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      name="mobileMoneyNumber"
                      value={formData.mobileMoneyNumber}
                      onChange={handleChange}
                      placeholder="Mobile Money Number"
                    />
                  </>
                )}
              </>
            )}

            <Input
              type="email"
              name="schoolEmail"
              value={formData.schoolEmail}
              onChange={handleChange}
              placeholder="Email"
            />
            <Input
              type="password"
              name="schoolPassword"
              value={formData.schoolPassword}
              onChange={handleChange}
              placeholder="Password"
            />

            <div className="pt-4">
              <button type="submit" className="w-full">
                <AppButton name={isSignUp ? "Next" : "Sign In"} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// Reusable input component
const Input = ({ name, type = "text", value, onChange, placeholder }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required
    className="w-full p-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
  />
);

export default Login;
