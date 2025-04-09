import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import TransactionTable from "../../components/dashboard/transactionTable";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import { useSchool } from "../../context/schoolContext";
import { baseUrl } from "../../constants/helpers";

const StudentFeeTypeDetails = () => {
  const location = useLocation();
  const student = location.state?.student;
  const queryParams = new URLSearchParams(location.search);
  const feeType = queryParams.get("type");
  const { school } = useSchool();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalFeeForType, setTotalFeeForType] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!student?.id || !feeType) return;

      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}transactions/${student.id}?feeType=${feeType}`);
        const data = await response.json();
        setTransactions(data);

        getStudentfeesTotal(student.id)
        const studentFeeInfo = student?.fees?.find(f => f.feeType === feeType);
        const totalFeeForThisType = studentFeeInfo ? studentFeeInfo.amount : 0;

        const totalPaidAmount = data.reduce((sum, transaction) => sum + transaction.amount, 0);
        setTotalPaid(totalPaidAmount);
        setTotalFeeForType(totalFeeForThisType);
       
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [student?._id, feeType]);


  const filteredTransactions = selectedDate
    ? transactions.filter(t => t.date.startsWith(selectedDate))
    : transactions;


    const getStudentfeesTotal = async (studentId) => {
      try {
        const response = await fetch(`${baseUrl}students/fees/${studentId}/${feeType}`);
        if (!response.ok) throw new Error(`Failed to fetch fees for student ${studentId}`);
        const data = await response.json();
        console.log(`Totalpaid: ${data.totalDebt}`)
        setTotalPaid(data.totalDebt);
        return data.totalDebt || 0; // Make sure to return 0 if there's no debt info
      } catch (error) {
        console.log(`Error getting total debt for student ${studentId}: ${error}`);
        return 0; // Return 0 if there's an error
      }
    };

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Set title styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`${school.schoolName}`, 100, 10, { align: "center" });
    doc.line(10, 75, 200, 75);

    // Student & Report Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`${feeType} Payment Receipt`, 105, 20, { align: "center" });
    doc.text(`Student Name: ${student.studentName}`, 10, 30);
    doc.text(`Class: ${student.studentClassName}`, 10, 40);
    doc.text(`Amount Paid: GHC ${filteredTransactions.reduce((sum, t) => sum + t.amount, 0)}`, 10, 50);
    doc.text(`Report Date: ${new Date().toLocaleDateString("en-GB")}`, 10, 60);

    // Draw a horizontal line for separation
    doc.line(10, 75, 200, 75);

    // Table with transactions
    autoTable(doc, {
      startY: 80,
      head: [["Date", "Amount (GHC)", "Transaction Type", "Payment Method"]],
      body: filteredTransactions.map(t => [
        new Date(t.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        `GHC ${t.amount}`,
        t.transactionType,
        t.paymentMethod,
      ]),
      theme: "striped",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 10 },
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`${feeType} Payment Receipt`, 105, 20, { align: "center" });
    doc.text(`Balance: ${totalFeeForType}`, 10, 115);

    // Footer
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("This is a system-generated report. If you have any questions, please contact our help support desk.", 10, finalY + 10);

    // Save PDF
    doc.save(`${student.studentName}_${feeType}_Report.pdf`);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-100 shadow-lg rounded-lg max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center ">{feeType} Information</h1>
      
      <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="bg-gray-200 text-gray-600 rounded-full w-24 h-24 flex justify-center items-center shadow-xl">
            <h1 className="text-3xl font-semibold">{student?.student_first_name?.charAt(0)}</h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">{student?.student_surname}, {student?.student_first_name} {student?.student_other_names}</h2>
            <h3 className="text-lg text-red-500">Total Amount Owed: GHC {totalPaid}</h3>
            <h3 className="text-lg text-green-500">Total Paid Amount: GHC {totalPaid}</h3>
            <p className="text-black">Class: {student?.student_class_name}</p>
            <p className="text-black">Parent: {student?.student_parent_surname} {student?.student_parent_first_name}</p>
            <p className="text-black">Parent Contact: {student?.student_parent_number}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition duration-300"
            onClick={handleGenerateReport}
          >
            Generate Receipt
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="date"
          className="border p-2 rounded-lg w-full bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-blue-300">Loading transactions...</p>
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default StudentFeeTypeDetails;
