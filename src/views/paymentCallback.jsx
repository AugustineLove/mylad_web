import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { baseUrl } from "../constants/helpers";

const PaymentCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAndCreate = async () => {
      try {
        console.log("Starting payment verification...");
  
        // Step 1: Verify payment
        const verifyRes = await axios.get(`${baseUrl}paystack/verify/${reference}`);
        console.log("Paystack verification response:", verifyRes.data);
  
        if (verifyRes.data?.data?.status === "success") {
          console.log("Payment was successful");
  
          const schoolData = JSON.parse(localStorage.getItem("pendingSchool"));
          console.log("School data to create:", schoolData.schoolData);

          const subaccountPayload = {
            business_name: schoolData.schoolData.schoolName,
            settlement_bank: schoolData.schoolData.settlementBankCode,
            account_number: schoolData.schoolData.bankAccountNumber,
            primary_contact_email: schoolData.schoolData.schoolEmail, // or any appropriate value
          };

          console.log(`Subaccount data: ${JSON.stringify(subaccountPayload)}`)

          const subRes = await axios.post(`${baseUrl}paystack/createSubAccount`, subaccountPayload);
          console.log("Subaccount response:", JSON.stringify(subRes.data));

          // Save subaccount code in the school data
          schoolData.schoolData.subAccountCode = subRes.data.subaccount_code;

          console.log(`Subaccount code 1: ${schoolData.schoolData.subAccountCode}`);
          console.log(`Subaccount code 2: ${subRes.data.data.subaccount_code}`);


          console.log(`Subaccount being posted: ${JSON.stringify(schoolData.schoolData)}`)
  
          // Step 2: Create school
          const addRes = await axios.post(`${baseUrl}schools/add`, schoolData.schoolData);
          console.log("School creation response:", addRes);
  
          if (addRes.status === 201) {
            alert("School created successfully!");
            localStorage.removeItem("pendingSchool");
            localStorage.removeItem("paystackRef");
            navigate("/login");
          } else {
            console.warn("School creation failed with status:", addRes.status);
            alert("School creation failed.");
            navigate("/subscribe");
          }
        } else {
          console.warn("Payment verification failed:", verifyRes.data);
          alert("Payment was not successful.");
          navigate("/subscribe");
        }
      } catch (err) {
        console.error("Caught error during verification/creation:", err);
        alert("Error verifying payment or creating school.");
        navigate("/subscribe");
      } finally {
        setLoading(false);
      }
    };
  
    if (reference) verifyAndCreate();
  }, [reference, navigate]);
  

  return (
    <div className="h-screen flex justify-center items-center text-lg font-medium text-gray-700">
      {loading ? (
        <p>Verifying payment and creating your school account. Please wait...</p>
      ) : (
        <p>Payment verification complete. Redirecting...</p>
      )}
    </div>
  );
};

export default PaymentCallback;
