import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";

import dayjs from "dayjs"; // To easily handle date manipulation
import { baseUrl } from "../../constants/helpers";

const UpgradeCallback = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndUpgrade = async () => {
      try {
        console.log("Verifying upgrade payment...");

        // 1. Verify payment with Paystack
        const verifyRes = await axios.get(`${baseUrl}paystack/verify/${reference}`);
        console.log("Verification response:", verifyRes.data);

        if (verifyRes.data?.data?.status === "success") {
          // 2. Get the upgrading school
          const school = JSON.parse(localStorage.getItem("upgradingSchool"));
          console.log("School to upgrade:", school);

          // 3. Calculate new expiration date (+3 months)
          const currentDate = school.registration_expiration_date
            ? dayjs(school.registration_expiration_date)
            : dayjs();

          const newExpirationDate = currentDate.add(3, "month").format("YYYY-MM-DD");

          // 4. Send update to backend
          const updateRes = await axios.put(`${baseUrl}schools/update-subscription/${school.id}`, {
            registration_expiration_date: newExpirationDate,
          });

          console.log("Upgrade update response:", updateRes.data);

          if (updateRes.status === 200) {
            alert("Subscription upgraded successfully!");
            localStorage.removeItem("upgradingSchool");
            localStorage.removeItem("upgradeRef");
            navigate("/dashboard"); // Or wherever you want
          } else {
            throw new Error("Upgrade failed.");
          }
        } else {
          alert("Payment verification failed.");
          navigate("/upgrade-subscription");
        }
      } catch (error) {
        console.error("Upgrade Error:", error);
        alert("An error occurred during upgrade.");
        navigate("/upgrade-subscription");
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      verifyAndUpgrade();
    }
  }, [reference, navigate]);

  return (
    <div className="h-screen flex justify-center items-center text-lg font-medium text-gray-700">
      {loading ? (
        <p>Verifying payment and upgrading your subscription. Please wait...</p>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default UpgradeCallback;
