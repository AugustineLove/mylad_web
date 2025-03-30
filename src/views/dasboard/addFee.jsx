import { useState } from "react";
import { useLocation } from "react-router";
import AppButton from "../../components/button";
import StudentTable from "../../components/dashboard/studentsTable";
import { useStudents } from "../../context/studentsContext";
import { useSchool } from "../../context/schoolContext";

const feeOptions = ["School Fees", "Admission Fees", "PTA Fees", "Exam Fees", "Others"];

const AddClassFeePage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const className = searchParams.get("class") || "Unknown Class";
  const { students } = useStudents()
  const { school } = useSchool()

  // State for fee type and amount
  const [feeType, setFeeType] = useState(feeOptions[0]); // Default to first option
  const [amount, setAmount] = useState("");

  // Filter students in the selected class
  const filteredStudents = students.filter(
    (student) => student.studentClassName === className
  );

  const handleAddFee = async (e) => {
    console.log("Adding fees")
    e.preventDefault(); // Prevent page reload
  
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid fee amount!");
      return;
    }
  
    const schoolId = school._id; // Get school ID from context
    const classId = filteredStudents.length > 0 ? filteredStudents[0].studentClass : null;

  if (!classId) {
    alert("Class ID not found. Please ensure students exist in this class.");
    return;
  }
  
    try {
      const response = await fetch(`http://localhost:3000/api/students/addClassFees/${schoolId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId,  
          feeType,
          amount: Number(amount),
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`Successfully added ${feeType} fee of ${amount} to all ${className} students.`);
        setAmount(""); // Reset input after success
      } else {
        alert(`Failed to add fee: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding fee:", error);
      alert("An error occurred while adding the fee. Please try again.");
    }
  };
  
  

  return (
    <div>
      <h1 className="text-2xl font-bold mt-[50px] mb-[30px]">
        {`Update fees for ${className} students`}
      </h1>

      <form onSubmit={handleAddFee}>
  <label className="block mb-2 text-gray-600">Select Fee Type:</label>
  <select
    value={feeType}
    onChange={(e) => setFeeType(e.target.value)}
    className="border border-[#B5AFAF] p-2 rounded w-1/2 mb-[20px]"
  >
    {feeOptions.map((fee, index) => (
      <option key={index} value={fee}>
        {fee}
      </option>
    ))}
  </select>

  <label className="block mb-2 text-gray-600">Enter Amount:</label>
  <input
    type="number"
    placeholder="Enter amount to add"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    className="border border-[#B5AFAF] p-2 rounded w-1/2 mb-[20px]"
  />

  <p className="text-red-400 mb-[20px]">
    NB: This amount will be added to the debt of all {className} students.
    Notifications will be sent to guardians about an addition of School
    fees to their children’s outstanding debt, if any. Fees can also be
    updated for individual students.
  </p>

  {/* Use button type="submit" instead of wrapping inside another button */}
  <button type="submit">
  <AppButton name="Add Fees" />
  </button>
</form>


      {/* Students Table */}
      <StudentTable studentsData={filteredStudents} filteredClass={className} />
    </div>
  );
};

export default AddClassFeePage;
