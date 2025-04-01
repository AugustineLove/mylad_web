import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { useSchool } from "../../context/schoolContext";

const ClassFees = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [fixedAmount, setFixedAmount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [dueDate, setDueDate] = useState("");

  const { school } = useSchool();
  
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
        body: JSON.stringify({ classId, feeType, amount: fixedAmount, dueDate }),
      });
      if (!response.ok) throw new Error("Failed to update fixed fee amount");
      alert("Fee updated successfully!");
      window.location.reload();
      setEditing(false);
    } catch (err) {
      console.error("Error updating fixed fee:", err);
    }
  };

  const handleRowClick = (student, feeType) => {
    navigate(`student?type=${feeType}`, { state: { student } });
  }

  const generatePDFReport = () => {
    const doc = new jsPDF();
  
    // School and Class Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`${school.schoolName}`, 105, 20, { align: "center" }); // Centered school name
    doc.setFontSize(12);
    doc.text(`Class: ${className}`, 105, 30, { align: "center" });
    doc.text(`Fee Type: ${feeType}`, 105, 40, { align: "center" });
  
    // Add Report Date
    doc.setFontSize(10);
    const reportDate = new Date().toLocaleDateString("en-GB");
    doc.text(`Report Date: ${reportDate}`, 10, 50);
  
    // Add a horizontal line under the header
    doc.setLineWidth(0.5);
    doc.line(10, 55, 200, 55);
  
    // Table Data Preparation
    const tableData = students.map((student, index) => {
      const fee = student.fees?.find((f) => f.feeType === feeType);
      return [
        index + 1, 
        student.studentName, 
        fee ? `GHC ${fee.amount.toFixed(2)}` : "Not Assigned", 
        fee ? fee.status : "N/A"
      ];
    });
  
    // Add Table to PDF
    autoTable(doc, {
      head: [["#", "Student Name", "Amount (GHC)", "Status"]],
      body: tableData,
      startY: 60,
      theme: "striped",
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 10 },
    });
  
    // Add Total Fee Info at the Bottom
    const totalAmount = students.reduce((sum, student) => {
      const fee = student.fees?.find((f) => f.feeType === feeType);
      return fee ? sum + fee.amount : sum;
    }, 0);
    
    doc.text(`Total Amount for ${feeType}: GHC ${totalAmount.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 10);
  
    // Page Numbering
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.text(`Page ${pageCount}`, 200, doc.internal.pageSize.height - 10, { align: "right" });
  
    // Save the PDF
    doc.save(`${feeType}_Report_${className}.pdf`);
  };
  

  if (loading) return <p className="text-center text-xl text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">{feeType} for {className}</h1>

      {/* Fixed Fee Amount Edit Section */}
      <div className="mb-6 p-6 bg-gray-50 rounded-md flex items-center gap-6">
        <label className="text-xl font-medium text-gray-700">Fixed Fee Amount (GH₵):</label>
        {editing ? (
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={fixedAmount}
              onChange={(e) => setFixedAmount(e.target.value)}
              className="border-2 border-gray-300 p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border-2 border-gray-300 p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <span className="text-xl text-gray-800">{fixedAmount}</span>
        )}
        <button 
          className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
          onClick={() => (editing ? updateFixedAmount() : setEditing(true))}
        >
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search students..."
          className="w-full p-3 border-2 border-gray-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Generate PDF Button */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={generatePDFReport} 
          className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none"
        >
          Generate PDF Report
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-semibold">#</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Student Name</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Debt (GH₵)</th>
             
            </tr>
          </thead>
          <tbody>
            {students
              .filter(s => s.studentSurname.toLowerCase().includes(search.toLowerCase()))
              .map((student, index) => {
                const fee = student.fees?.find((f) => f.feeType === feeType);
                const studentFullName = `${student.studentSurname} ${student.studentFirstName} ${student.studentOtherNames}`;
                return (
                  <tr 
                    key={student._id} 
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(student, feeType)}
                  >
                    <td className="px-6 py-4 text-center text-sm">{index + 1}</td>
                    <td className="px-6 py-4 text-sm">{studentFullName}</td>
                    <td className="px-6 py-4 text-center text-sm">{fee ? fee.amount : "Not Assigned"}.00</td>
                    
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
