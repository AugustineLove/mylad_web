import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useSchool } from "../../context/schoolContext";
import { baseUrl } from "../../constants/helpers";

const AddFeesPage = () => {
  const { school } = useSchool();
  const [feeTypes, setFeeTypes] = useState([]);

  useEffect(() => {
    if (school && school.id) {
      fetchFeeTypesOfSchool();
    }
  }, [school]);

  const fetchFeeTypesOfSchool = async () => {
    try {
      const response = await fetch(`${baseUrl}schools/${school.id}/feeTypes`);
      const data = await response.json();

      if (Array.isArray(data.feeTypes)) {
        setFeeTypes(data.feeTypes);
      } else {
        if (response.status === 201){
          setFeeTypes([]);
        }
      }
    } catch (error) {
      console.error("Error fetching fee types:", error);
    }
  };

  const handleAddFeeType = async () => {
    const feeType = prompt("Enter new fee type:");
    if (!feeType) return;

    try {
      const response = await fetch(`${baseUrl}schools/${school.id}/addFeeType`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId: school.id, feeType, amount: 0 }),
      });

      if (!response.ok) throw new Error("Failed to add fee type");

      await fetchFeeTypesOfSchool(); // Refresh after adding
    } catch (error) {
      console.error("Error adding fee type:", error);
      alert("Failed to add fee type.");
    }
  };

  const handleDeleteFeeType = async (feeType) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${feeType}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseUrl}schools/deleteFeeType`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId: school.id, feeType }),
      });

      if (!response.ok) throw new Error("Failed to delete fee type");

      await fetchFeeTypesOfSchool(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting fee type:", error);
      alert("Failed to delete fee type.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Select a Fee Type to View or Edit Payments
      </h1>

      {/* Fee Types Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {feeTypes.map((fee) => (
          <div
            key={fee.id}
            className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-[#647DEE] to-[#7F53AC] hover:scale-105 transform transition-all duration-300"
          >
            <NavLink to={`selectedFees?type=${encodeURIComponent(fee.fee_type)}`}>
              <h2 className="text-xl font-semibold text-white">{fee.fee_type}</h2>
              <div className="w-full h-[2px] bg-white my-2" />
              <p className="text-gray-200">View {fee.fee_type} details</p>
            </NavLink>
            <button
              onClick={() => handleDeleteFeeType(fee.fee_type)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add New Fee Type Button */}
      <div className="mt-10">
        <button
          onClick={handleAddFeeType}
          className="px-6 py-3 bg-[#ff4b2b] text-white font-bold text-lg rounded-lg shadow-md hover:bg-[#ff6f61] transform hover:scale-105 transition-all duration-300"
        >
          Add New Fee Type
        </button>
      </div>
    </div>
  );
};

export default AddFeesPage;
