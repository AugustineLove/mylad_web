import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

const ClassFees = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [fixedAmount, setFixedAmount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [dueDate, setDueDate] = useState("");
  
  const queryParams = new URLSearchParams(useLocation().search);
  const feeType = queryParams.get("type");
  const className = queryParams.get("class");
  const classId = queryParams.get("classId");

  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/classes/${classId}/students`);
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFixedAmount = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/classes/${classId}/${feeType}`);
        if (!response.ok) throw new Error("Failed to fetch fixed fee amount");
        const data = await response.json();
        setFixedAmount(data.amount);
      } catch (err) {
        console.error("Error fetching fixed amount:", err);
      }
    };

    fetchStudents();
    fetchFixedAmount();
  }, [classId, feeType]);

  const updateFixedAmount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/classes/${classId}/${feeType}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  classId:classId, feeType:feeType, amount: fixedAmount, dueDate: dueDate }),
      });
      if (!response.ok) throw new Error("Failed to update fixed fee amount");
      alert("Fee updated successfully!");
      window.location.reload()
      setEditing(false);
    } catch (err) {
      console.error("Error updating fixed fee:", err);
    }
  };
  console.log(`Error on the page: ${error}`)

  const handleRowClick = (student, feeType) => {
    navigate(`student?type=${feeType}`, { state: { student } });
  }

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text(`${feeType} Report for ${className}`, 14, 10);
    
    const tableData = students.map((student, index) => {
      const fee = student.fees?.find((f) => f.feeType === feeType);
      return [index + 1, student.studentName, fee ? fee.amount : "Not Assigned", fee ? fee.status : "N/A"];
    });

    autoTable(doc, {
      head: [["#", "Student Name", "Amount (GHC)", "Status"]],
      body: tableData,
      startY: 20,
    });

    doc.save(`${feeType}_Report_${className}.pdf`);
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  /* if (error) return <p className="text-center text-red-500 mt-4">{error}</p>; */
  /* if (students.length === 0) return <p className="text-center mt-4">No students found.</p>; */

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">{feeType} for {className}</h1>
      
      {/* Fixed Fee Amount Edit Section */}
      <div className="mb-4 p-4 bg-gray-100 rounded-md flex items-center gap-4">
        <label className="font-bold">Fixed Fee Amount (GH₵):</label>
        {editing ? (
          <>
          
          <input
            type="number"
            value={fixedAmount}
            onChange={(e) => setFixedAmount(e.target.value)}
            className="border p-2 rounded-md"
          />
           <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
          </>
          
          
        ) : (
          <span>{fixedAmount}</span>
        )}
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => (editing ? updateFixedAmount() : setEditing(true))}
        >
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search students..."
        className="w-full p-2 mb-4 border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

<button onClick={generatePDFReport} className="bg-[#014410] text-white px-4 py-2 mb-4 rounded-md hover:cursor-pointer">
        Generate PDF Report
      </button>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Student Name</th>
              
              <th className="border px-4 py-2">Amount (GH₵)</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.filter(s => s.studentName.toLowerCase().includes(search.toLowerCase())).map((student, index) => {
              const fee = student.fees?.find((f) => f.feeType === feeType);
              return (
                <tr 
                  key={student._id} 
                  className="bg-white hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(student, feeType)}
                >
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2">{student.studentName}</td>
                 
                  <td className="border px-4 py-2 text-center">{fee ? fee.amount : "Not Assigned"}</td>
                  <td className="border px-4 py-2 text-center">{fee ? fee.status : "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassFees;
