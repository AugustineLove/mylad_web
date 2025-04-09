import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { baseUrl } from "../../constants/helpers";

const StudentTable = ({ studentsData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [feesData, setFeesData] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch fees for all students
    fetch(`${baseUrl}students/feeType/balance`) // Update with your actual API endpoint
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item, index) => {
          console.log(`Item ${index + 1}:`, item);
        });
        
        // Convert fees list into a { student_id: total_fees } object
        const feesMap = data.reduce((acc, fee) => {
          const id = fee.id; // use correct key name here
          const amount = parseFloat(fee.total_fees || 0); // ensure it's a number
          if (id) acc[id] = amount;
          return acc;
        }, {});
        
        console.log("feesMap:", feesMap);
        setFeesData(feesMap);
      })
      .catch((error) => console.error("Error fetching fees:", error));
  }, []);

  // Extract unique class names for dropdown options
  const uniqueClasses = [...new Set(studentsData.map((s) => s.student_class_name))];

  // Filter students by name and selected class
  const filteredStudents = studentsData
    .filter((student) =>
      `${student.student_surname} ${student.student_first_name} ${student.student_other_names}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((student) => (selectedClass ? student.student_class_name === selectedClass : true))
    .sort((a, b) => a.student_surname.localeCompare(b.student_surname)); // Sort by surname

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
                {student.student_surname} {student.student_first_name} {student.student_other_names}
              </td>
              <td className="border p-2">{student.student_class_name}</td>
              <td className="border p-2">
              {feesData[student.id] || 0}
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
