import { useState } from "react";
import { useNavigate } from "react-router";

const TransactionTable = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();

  const filteredStudents = props.studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedClass ? student.class === selectedClass : true)
  );

  const handleRowClick = (studentId) => {
    navigate(`studentDetails?id=${studentId}`);
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
          <option value="">{props.filteredClass ? props.filteredClass : "All Classes"}</option>
          {[...new Set(props.studentsData.map((s) => s.class))].map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#b3b3b3]">
            <th className="border p-2">#</th>
            <th className="border p-2">Type of Transaction</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr
              key={index}
              className="text-center border cursor-pointer hover:bg-gray-200"
              onClick={() => handleRowClick(student.id)}
            >
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.amount}</td>
              <td className="border p-2">{student.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
