import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";

const PaymentCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyAndCreate = async () => {
      try {
        const verifyRes = await axios.get(`http://localhost:5050/api/paystack/verify?reference=${reference}`);

        if (verifyRes.data.data.status === "success") {
          const schoolData = JSON.parse(localStorage.getItem("pendingSchool"));
          const addRes = await axios.post("http://localhost:5050/api/schools/add", schoolData);

          if (addRes.status === 201) {
            alert("School created successfully!");
            localStorage.removeItem("pendingSchool");
            localStorage.removeItem("paystackRef");
            navigate("/login");
          } else {
            alert("School creation failed.");
            navigate("/subscribe");
          }
        } else {
          alert("Payment was not successful.");
          navigate("/subscribe");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Error verifying payment or creating school.");
        navigate("/subscribe");
      }
    };

    if (reference) verifyAndCreate();
  }, [reference, navigate]);

  return (
    <div className="h-screen flex justify-center items-center text-lg font-medium text-gray-700">
      Verifying payment and creating your school account. Please wait...
    </div>
  );
};

export default PaymentCallback;
