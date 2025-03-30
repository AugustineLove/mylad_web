import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import TransactionTable from "../../components/dashboard/transactionTable";
import jsPDF from "jspdf";
import {autoTable} from "jspdf-autotable";
import { useSchool } from "../../context/schoolContext";

const StudentFeeTypeDetails = () => {
  const location = useLocation();
  const student = location.state?.student;
  const queryParams = new URLSearchParams(location.search);
  const feeType = queryParams.get("type");
  const { school } = useSchool();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  // const [totalAmountOwed, setTotalAmountOwed] = useState(0);
  const [totalFeeForType, setTotalFeeForType] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!student?._id || !feeType) return;
  
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/transactions/${student._id}?feeType=${feeType}`);
        const data = await response.json();
        setTransactions(data);

          // Get total fee for this feeType (assuming it’s in student data)
          const studentFeeInfo = student?.fees?.find(f => f.feeType === feeType);
          const totalFeeForThisType = studentFeeInfo ? studentFeeInfo.amount : 0;

          console.log(totalFeeForThisType);
          // Calculate total amount paid
          const totalPaidAmount = data.reduce((sum, transaction) => sum + transaction.amount, 0);
  
          // Calculate total amount owed
          /* const totalOwed = totalFeeForThisType - totalPaidAmount; */
  
          // Update state
          setTotalFeeForType(totalFeeForThisType);
          setTotalPaid(totalPaidAmount);
         /*  setTotalAmountOwed(totalOwed); */
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, [student?._id, feeType]);
  
  

  // Filter transactions based on selected date
  const filteredTransactions = selectedDate
    ? transactions.filter(t => t.date.startsWith(selectedDate))
    : transactions;

    const handleGenerateReport = () => {
      const doc = new jsPDF();
  
      // Set title styles
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text( `${school.schoolName}`, 100, 10, { align: "center" });
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
              `GHC ${t.amount.toFixed(2)}`,
              t.transactionType,
              t.paymentMethod
          ]),
          theme: "striped",
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" }, // Blue header
          alternateRowStyles: { fillColor: [240, 240, 240] }, // Light gray alternate rows
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
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-7">{feeType} Info</h1>
      <div className="flex items-start justify-between gap-6 mb-6">
       
        <div className="flex space-x-5">
          <div className='rounded-full bg-gray-200 w-28 h-28 flex justify-center items-center'>
          <h1 className="text-5xl font-bold text-gray-600">{student?.studentName?.charAt(0)}</h1>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{student?.studentName}</h2>
            <h2 className="text-[18px] font-semibold text-red-500">Total Amount Owed: GH₵{totalFeeForType}</h2>
            <h2 className="text-[18px] text-green-500">Total Paid Amount: GH₵{totalPaid}</h2>
            <p className="text-gray-600">Class: {student?.studentClassName}</p>
            <p className="text-gray-600">Parent: {student?.studentParentName}</p>
            <p className="text-gray-600">Parent: {student?.studentParentNumber}</p>
          </div>
        </div>

        {/* Generate report button */}
        <div className="mt-6 text-center">
                  <button
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
                    onClick={handleGenerateReport}
                  >
                    Generate Receipt
              </button>
            </div>

      </div>
      
      <div className="mb-4">
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-blue-500">Loading transactions...</p>
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}

      
    </div>
  );
};

export default StudentFeeTypeDetails;
