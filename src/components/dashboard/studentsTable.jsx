import { useState } from "react";
import { useNavigate } from "react-router";

const StudentTable = ({ studentsData, filteredClass }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();

  const filteredStudents = studentsData.filter(
    (student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass ? student.studentClass === selectedClass : true)
  );

  const handleRowClick = (student) => {
    navigate(`studentDetails`, { state: { student } });
  };

  return (
    <div className="p-6 w-[100%] mx-auto">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded w-1/2"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">{filteredClass || "All Classes"}</option>
          {[...new Set(studentsData.map((s) => s.studentClassName))].map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#b3b3b3]">
            <th className="border p-2">No.</th>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Total Debt</th>
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
              <td className="border p-2">{student.studentName}</td>
              <td className="border p-2">{student.studentClassName}</td>
              <td className="border p-2">${student.fees.reduce((acc, fee) => acc + fee.amount, 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;