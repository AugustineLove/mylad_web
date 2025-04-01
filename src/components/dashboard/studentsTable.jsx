import { useState } from "react";
import { useNavigate } from "react-router";

const StudentTable = ({ studentsData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();

  // Extract unique class names for dropdown options
  const uniqueClasses = [...new Set(studentsData.map((s) => s.studentClassName))];

  // Filter students by name and selected class
  const filteredStudents = studentsData
    .filter((student) =>
      `${student.studentSurname} ${student.studentFirstName} ${student.studentOtherNames}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((student) => (selectedClass ? student.studentClassName === selectedClass : true))
    .sort((a, b) => a.studentSurname.localeCompare(b.studentSurname)); // Sort by surname

  const handleRowClick = (student) => {
    navigate("studentDetails", { state: { student } });
  };

  return (
    <div className="p-6 w-full mx-auto">
      {/* Search and Filter */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {uniqueClasses.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Student Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#b3b3b3]">
            <th className="border p-2">No.</th>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Total Debt (GH₵)</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr
              key={index}
              className="text-center border cursor-pointer hover:bg-gray-200"
              onClick={() => handleRowClick(student)}
            >
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                {student.studentSurname} {student.studentFirstName} {student.studentOtherNames}
              </td>
              <td className="border p-2">{student.studentClassName}</td>
              <td className="border p-2">
                {student.fees?.reduce((acc, fee) => acc + fee.amount, 0) || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No results message */}
      {filteredStudents.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No students match your search criteria.</p>
      )}
    </div>
  );
};

export default StudentTable;
