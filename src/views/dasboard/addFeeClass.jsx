import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useSchool } from "../../context/schoolContext";
import AppButton from "../../components/button";

const AddFeesPage = () => {
  const { school } = useSchool();
  const [feeTypes, setFeeTypes] = useState([]);

  useEffect(() => {
    if (school && school.feeTypes) {
      setFeeTypes(school.feeTypes);
    }
  }, [school]);

  const handleAddFeeType = async () => {
    const feeType = prompt("Enter new fee type:");
    if (!feeType) return;

    try {
      const response = await fetch(`http://localhost:3000/api/schools/${school._id}/addFeeType`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({schoolId: school._id, feeType: feeType, amount: 0 }),
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
    <div>
      <h1 className="text-2xl font-bold mb-[50px] mt-[50px]">Select Fee Type</h1>
      <div className="w-[70%] grid grid-cols-3 gap-5">
        {feeTypes.map((fee) => (
          <NavLink key={fee.feeType} to={`selectedFees?type=${encodeURIComponent(fee.feeType)}`}>
            <div className="p-4 border rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 cursor-pointer text-center">
              {fee.feeType}
            </div>
          </NavLink>
        ))}
      </div>
      <div className="mt-6">
        <button onClick={handleAddFeeType}>
          <AppButton name="Add New Fee Type" />
        </button>
      </div>
    </div>
  );
};

export default AddFeesPage;
