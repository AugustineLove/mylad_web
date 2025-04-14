import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSchool } from "../../context/schoolContext"; // Example
import { useStudents } from "../../context/studentsContext";
import FeeCatCard from "../../components/dashboard/feetCatCard";
import { NavLink } from "react-router";
import StudentTable from "../../components/dashboard/studentsTable";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { students, loading } = useStudents();
  const { school } = useSchool(); // assumes `school` object is available

  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Navigation Buttons */}
      <div className="flex space-x-4 justify-center mb-6">
        {[
          { label: "All Fees", path: "addFees" },
          { label: "Class Records", path: "classRecord" },
          { label: "Add Student", path: "addStudent" },
          { label: "Generate Report", path: "generalReport" },
        ].map((item) => (
          <NavLink key={item.label} to={item.path}>
            <div className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 text-gray-800 text-lg font-medium">
              {item.label}
            </div>
          </NavLink>
        ))}
      </div>

      {/* Student Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        {loading ? (
          <p className="text-gray-500 text-center">Loading students...</p>
        ) : students && students.length > 0 ? (
          <StudentTable studentsData={students} />
        ) : (
          <p className="text-gray-500 text-center">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
