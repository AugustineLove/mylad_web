import { useState } from "react";

const BankAccountForm = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState("");
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank"); // Default to bank form
  const [banks] = useState([
    { id: "1", name: "CAL Bank Limited" },
    { id: "2", name: "GCB Bank Limited" },
    { id: "3", name: "Zenith Bank Ghana" }, // Example bank missing from API
    { id: "4", name: "Prudential Bank Limited" },
    { id: "5", name: "Ecobank Ghana Limited" },
    // Add more banks here
  ]);

  // Handle bank selection change
  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  // Handle account number input
  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  // Handle account holder name input
  const handleAccountHolderNameChange = (e) => {
    setAccountHolderName(e.target.value);
  };

  // Handle mobile money number change
  const handleMobileMoneyNumberChange = (e) => {
    setMobileMoneyNumber(e.target.value);
  };

  // Handle mobile money provider selection
  const handleMobileMoneyProviderChange = (e) => {
    setMobileMoneyProvider(e.target.value);
  };

  // Toggle between Bank and Mobile Money form
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="form-container flex flex-col m-auto pt-[200px] mb-[100px] max-w-7xl mx-auto">
      <form className="space-y-8 bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Payment Information
        </h2>

        {/* Payment Method Toggle */}
        <div className="flex justify-center mb-8">
          <label className="mr-4">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            Bank Account
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="mobileMoney"
              checked={paymentMethod === "mobileMoney"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            Mobile Money
          </label>
        </div>

        {/* Bank Account Form (Left Side) */}
        {paymentMethod === "bank" && (
          <div className="flex space-x-8">
            <div className="w-1/2">
              <div className="form-group">
                <label htmlFor="bank" className="block text-lg font-semibold text-gray-600">
                  Select Bank
                </label>
                <select
                  id="bank"
                  value={selectedBank}
                  onChange={handleBankChange}
                  className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose Bank</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="accountNumber" className="block text-lg font-semibold text-gray-600">
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  placeholder="Enter Account Number"
                  className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="accountHolderName" className="block text-lg font-semibold text-gray-600">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  id="accountHolderName"
                  value={accountHolderName}
                  onChange={handleAccountHolderNameChange}
                  placeholder="Enter Account Holder's Name"
                  className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Caution Message */}
            <div className="w-1/2">
              <p className="text-sm text-red-600 font-medium mt-2">
                Please be cautious when entering the account number and holder's name.
                Ensure that the details are correct to avoid any errors with transactions.
              </p>
            </div>
          </div>
        )}

        {/* Mobile Money Form (Right Side) */}
        {paymentMethod === "mobileMoney" && (
          <div className="flex space-x-8">
            <div className="w-1/2">
              <div className="form-group">
                <label htmlFor="mobileMoneyProvider" className="block text-lg font-semibold text-gray-600">
                  Select Mobile Money Provider
                </label>
                <select
                  id="mobileMoneyProvider"
                  value={mobileMoneyProvider}
                  onChange={handleMobileMoneyProviderChange}
                  className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose Provider</option>
                  <option value="MTN">MTN Mobile Money</option>
                  <option value="Vodafone">Vodafone Cash</option>
                  <option value="AirtelTigo">AirtelTigo Money</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mobileMoneyNumber" className="block text-lg font-semibold text-gray-600">
                  Mobile Money Number
                </label>
                <input
                  type="text"
                  id="mobileMoneyNumber"
                  value={mobileMoneyNumber}
                  onChange={handleMobileMoneyNumberChange}
                  placeholder="Enter Mobile Money Number"
                  className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Caution Message */}
            <div className="w-1/2">
              <p className="text-sm text-red-600 font-medium mt-2">
                Please be cautious when entering the mobile money number and provider details.
                Ensure the information is accurate to prevent transaction issues.
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-blue-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankAccountForm;
