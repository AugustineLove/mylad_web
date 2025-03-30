import React, { useState } from "react";
import AppButton from "../../components/button";
import { useSchool } from "../../context/schoolContext";
import { useNavigate } from "react-router";
import { useStudents } from "../../context/studentsContext";

const AddStudent = () => {
    const { school } = useSchool();
    const navigate = useNavigate();
    const { updateStudents } = useStudents();

  const [formData, setFormData] = useState({
    studentName: "",
    studentClass: "",
    school: school._id,
    studentAddress: "",
    studentParentName: "",
    studentParentNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("Submitting")
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/api/students/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create student");
      }

      /* const data = await response.json(); */
      alert("Student added successfully!");
      updateStudents(school._id);
      navigate('/dashboard')
      setFormData({ 
        studentName: "",
        studentClass: "",
        school: "",
        studentAddress: "",
        studentParentName: "",
        studentParentNumber: "",
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add student");
    }
  };

  return (
    <div className="flex m-auto justify-center items-center h-full w-full space-x-[5%]">
      <div className="flex h-[50%]">
        <div className="w-[230px] h-[314px] rounded-2xl border border-gray-300 bg-gray-100"></div>
      </div>

      <div className="w-[50%] flex flex-col justify-center items-center">
        <form className="space-y-[40px] mb-[50px]" onSubmit={handleSubmit}>
          <input
            type="text"
            name="studentName"
            placeholder="Enter student name"
            value={formData.studentName}
            onChange={handleChange}
            className="border border-gray-200 p-3 w-full rounded"
            required
          />
         <select
            name="studentClass"
            value={formData.studentClass}
            onChange={handleChange}
            className="border border-gray-200 p-3 w-full rounded"
            required
            >
            <option value="">Select Class</option>
            <option value="Pre-School">Pre-School</option>
            {[...Array(9)].map((_, index) => (
                <option key={index + 1} value={`Basic ${index + 1}`}>
                Basic {index + 1}
                </option>
            ))}
            </select>
          <input
            type="text"
            name="studentAddress"
            placeholder="Enter student address"
            value={formData.studentAddress}
            onChange={handleChange}
            className="border border-gray-200 p-3 w-full rounded"
            required
          />
          <input
            type="text"
            name="studentParentName"
            placeholder="Enter parent name"
            value={formData.studentParentName}
            onChange={handleChange}
            className="border border-gray-200 p-3 w-full rounded"
            required
          />
          <input
            type="text"
            name="studentParentNumber"
            placeholder="Enter parent number"
            value={formData.studentParentNumber}
            onChange={handleChange}
            className="border border-gray-200 p-3 w-full rounded"
            required
          />
          <div className="flex justify-center mt-6">
              <button type="submit">
                <AppButton name="Add Student" />
              </button>
              </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
