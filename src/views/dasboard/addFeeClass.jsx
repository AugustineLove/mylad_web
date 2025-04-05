import { useEffect, useState } from "react";
import { NavLink } from "react-router"; // Ensure correct import
import { useSchool } from "../../context/schoolContext";
import AppButton from "../../components/button";
import { baseUrl } from "../../constants/helpers";

const AddFeesPage = () => {
  const { school } = useSchool();
  const [feeTypes, setFeeTypes] = useState([]);

  useEffect(() => {
    fetchFeeTypesOfSchool();
    if (school && school.feeTypes) {
      setFeeTypes(school.feeTypes);
    }
  }, [school]);

  const fetchFeeTypesOfSchool = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/schools/${school.id}/feeTypes`);
      const data = await response.json();
  
      console.log("Raw API Response:", data);
  
      if (Array.isArray(data.feeTypes)) {
        setFeeTypes(data.feeTypes); // Ensure you set the array, not the whole object
        console.log(data.feeTypes)
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching fee types:", error);
    }
  };
  

  const handleAddFeeType = async () => {
    const feeType = prompt("Enter new fee type:");
    if (!feeType) return;

    try {
      const response = await fetch(`http://localhost:5050/api/schools/${school.id}/addFeeType`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId: school.id, feeType: feeType, amount: 0 }),
      });

      if (!response.ok) throw new Error("Failed to add fee type");

      const updatedSchool = await response.json();
      setFeeTypes(updatedSchool.feeTypes);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add fee type.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Select a Fee Type to View or Edit Payments</h1>

      {/* Fee Type Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {feeTypes.map((fee) => (
          <NavLink key={fee.id} to={`selectedFees?type=${encodeURIComponent(fee.fee_type)}`}>
            <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-[#647DEE] to-[#7F53AC] hover:scale-105 transform transition-all duration-300 cursor-pointer">

              <h1 className="text-xl font-semibold text-white">{fee.fee_type}</h1>
              <div className="w-full h-[2px] bg-white my-2"></div>
              <p className="text-gray-200">View {fee.fee_type} details</p>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Add Fee Type Button */}
      <div className="mt-8">
        <button onClick={handleAddFeeType} className="px-6 py-3 bg-[#ff4b2b] text-white font-bold text-lg rounded-lg shadow-md hover:bg-[#ff6f61] transform hover:scale-105 transition-all duration-300">
          Add New Fee Type
        </button>
      </div>
    </div>
  );
};

export default AddFeesPage;
