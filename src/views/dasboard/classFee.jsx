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
  /* const [totalDebt, setTotalDebt] = useState(0); */

  const { school } = useSchool();

  const queryParams = new URLSearchParams(useLocation().search);
  const feeType = queryParams.get("type");
  const className = queryParams.get("class");
  const classId = queryParams.get("classId");

  const navigate = useNavigate();

  // Fetch Students
  useEffect(() => {
    const fetchStudentsWithDebt = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5050/api/classes/${classId}/students`);
        if (!response.ok) throw new Error("Failed to fetch students");
        const studentsData = await response.json();
  
        // Fetch debt for each student and add it to their data
        const studentsWithDebt = await Promise.all(
          studentsData.map(async (student) => {
            const totalDebt = await getStudentfeesTotal(student.id);
            return { ...student, totalDebt }; // Add totalDebt to the student object
          })
        );
  
        setStudents(studentsWithDebt); // Set students with their total debt
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudentsWithDebt();
  }, [classId]); // Only run when classId changes
  

  const getStudentfeesTotal = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/students/fees/${studentId}/${feeType}`);
      if (!response.ok) throw new Error(`Failed to fetch fees for student ${studentId}`);
      const data = await response.json();
      return data.totalDebt || 0; // Make sure to return 0 if there's no debt info
    } catch (error) {
      console.log(`Error getting total debt for student ${studentId}: ${error}`);
      return 0; // Return 0 if there's an error
    }
  };

  console.log(`Students: ${JSON.stringify(students)}`)
  

  // Fetch Fixed Amount for the class and fee type
  useEffect(() => {
    const fetchFixedAmount = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/classes/${classId}/${feeType}`);
        if (!response.ok) throw new Error("Failed to fetch fixed fee amount");
        const data = await response.json();
        console.log(`Fixed amount ${JSON.stringify(data, null, 2)}`);
        setFixedAmount(data.amount);
      } catch (err) {
        console.error("Error fetching fixed amount:", err);
      }
    };

    fetchFixedAmount();
  }, [classId, feeType]);

  // Update Fixed Amount
  const updateFixedAmount = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/classes/fees/${classId}/${feeType}`, {
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
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
  
    // Header: School Info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(school.school_name.toUpperCase(), 105, 20, { align: "center" });
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`${feeType.toUpperCase()} REPORT`, 105, 28, { align: "center" });
    doc.text(`Class: ${className}`, 105, 35, { align: "center" });
  
    // Report date
    const reportDate = new Date().toLocaleDateString("en-GB");
    doc.setFontSize(10);
    doc.text(`Report Date: ${reportDate}`, 14, 43);
  
    // Separator line
    doc.setLineWidth(0.5);
    doc.line(10, 47, 200, 47);
  
    // Table Data
    const tableData = students.map((student, index) => [
      index + 1,
      `${student.student_surname} ${student.student_first_name} ${student.student_other_names}`,
      `GHC ${student.totalDebt?.toFixed(2) || "0.00"}`
    ]);
  
    autoTable(doc, {
      head: [["#", "Student Name", "Debt (GHC)"]],
      body: tableData,
      startY: 52,
      theme: "striped",
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: 255,
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: 50,
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 15 },
        1: { cellWidth: 120 },
        2: { halign: "right", cellWidth: 40 },
      },
      margin: { top: 10 },
    });
  
    // Total Debt Summary
    const totalDebt = students.reduce((sum, student) => sum + (student.totalDebt || 0), 0);
    const totalY = doc.lastAutoTable.finalY + 10;
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Total Class Debt: GHC ${totalDebt.toFixed(2)}`, 14, totalY);
  
    // Footer
    const pageHeight = doc.internal.pageSize.height;
    const pageCount = doc.internal.getNumberOfPages();
  
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(`Generated on ${reportDate}`, 14, pageHeight - 10);
    doc.text(`Page ${pageCount}`, 200, pageHeight - 10, { align: "right" });
  
    // Save file
    const fileName = `${feeType.replace(/\s+/g, "_")}_Report_${className.replace(/\s+/g, "_")}.pdf`;
    doc.save(fileName);
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
              .filter(s => s.student_surname.toLowerCase().includes(search.toLowerCase()))
              .map((student, index) => {
                const studentFullName = `${student.student_surname} ${student.student_first_name} ${student.student_other_names}`;
                return (
                  <tr 
                    key={student.id} 
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(student, feeType)}
                  >
                    <td className="px-6 py-4 text-center text-sm">{index + 1}</td>
                    <td className="px-6 py-4 text-sm">{studentFullName}</td>
                    <td className="px-6 py-4 text-center text-sm">
                    {student.totalDebt ? `GHC ${student.totalDebt.toFixed(2)}` : 0}
                  </td>

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
