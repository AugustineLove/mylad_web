import React, { useState } from "react";
import AppButton from "../../components/button";
import { useSchool } from "../../context/schoolContext";
import { useNavigate } from "react-router";
import { useStudents } from "../../context/studentsContext";
import { UserCard } from "../../assets";

const AddStudent = () => {
  const { school } = useSchool();
  const navigate = useNavigate();
  const { updateStudents } = useStudents();

  const [formData, setFormData] = useState({
    studentFirstName: "",
    studentSurname: "",
    studentOtherNames: "",
    studentGender: "",
    studentClass: "",
    school: school._id,
    studentAddress: "",
    studentParentSurname: "",
    studentParentFirstName: "",
    studentParentNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("Submitting");
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

      alert("Student added successfully!");
      updateStudents(school._id);
      navigate("/dashboard");
      setFormData({
        studentFirstName: "",
        studentSurname: "",
        studentOtherNames: "",
        studentGender: "",
        studentClass: "",
        studentAddress: "",
        studentParentSurname: "",
        studentParentFirstName: "",
        studentParentNumber: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add student");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-6 py-5">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-10 transition duration-300 transform hover:scale-[1.02]">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8 tracking-wide">
          Add New Student
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Profile Card */}
          <div className="flex justify-center items-center w-full md:w-1/3 mb-6 md:mb-0">
            <div className="w-[250px] h-[330px] rounded-2xl border border-gray-300 bg-gray-100 flex flex-col justify-center items-center shadow-md">
              <UserCard />
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-2/3">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="text"
                  name="studentSurname"
                  placeholder="Surname"
                  value={formData.studentSurname}
                  onChange={handleChange}
                  className="input-style p-[10px]"
                  required
                />
                <input
                  type="text"
                  name="studentFirstName"
                  placeholder="First Name"
                  value={formData.studentFirstName}
                  onChange={handleChange}
                  className="input-style p-[10px]"
                  required
                />
              </div>

              <input
                type="text"
                name="studentOtherNames"
                placeholder="Other Names"
                value={formData.studentOtherNames}
                onChange={handleChange}
                className="input-style p-[10px]"
              />

              <select 
                name="studentClass"
                value={formData.studentClass}
                onChange={handleChange}
                className="input-style p-[10px]"
                required
              >
                <option value="">Select Class</option>
                <option value="Creche">Creche</option>
                <option value="Nursery 1">Nursery 1</option>
                <option value="Nursery 2">Nursery 2</option>
                <option value="Kindergarten 1">Kindergarten 1</option>
                <option value="Kindergarten 2">Kindergarten 2</option>
                {[...Array(9)].map((_, index) => (
                  <option key={index + 1} value={`Basic ${index + 1}`}>
                    Basic {index + 1}
                  </option>
                ))}
              </select>

              <select
                name="studentGender"
                value={formData.studentGender}
                onChange={handleChange}
                className="input-style p-[10px]"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input
                type="text"
                name="studentAddress"
                placeholder="Student Address"
                value={formData.studentAddress}
                onChange={handleChange}
                className="input-style p-[10px]"
                 required
              />

              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="text"
                  name="studentParentSurname"
                  placeholder="Parent's Surname"
                  value={formData.studentParentSurname}
                  onChange={handleChange}
                  className="input-style p-[10px]"
                  required
                />
                <input
                  type="text"
                  name="studentParentFirstName"
                  placeholder="Parent's First Name"
                  value={formData.studentParentFirstName}
                  onChange={handleChange}
                  className="input-style p-[10px]"
                  required
                />
              </div>

              <input
                type="text"
                name="studentParentNumber"
                placeholder="Parent's Phone Number"
                value={formData.studentParentNumber}
                onChange={handleChange}
                className="input-style p-[10px]"
                 required
              />

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button type="submit" className="w-full md:w-auto">
                  <AppButton name="Add Student" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Tailwind Styles for Inputs */}
      <style jsx>{`
        .input-style {
          @apply border border-gray-300 p-4 w-full rounded-xl shadow-sm bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out text-lg;
        }
      `}</style>
    </div>
  );
};

export default AddStudent;
