import { useEffect, useState } from "react";
import { useSchool } from "../../context/schoolContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { baseUrl } from "../../constants/helpers";

const ReportPage = () => {
    const { school } = useSchool();
    const schoolId = school?.id;

    const [transactions, setTransactions] = useState([]);
    const [classes, setClasses] = useState([]);
    const [feeTypes, setFeeTypes] = useState([]);
    const [selectedClass, setSelectedClass] = useState("all");
    const [selectedFeeType, setSelectedFeeType] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 20;
    

    useEffect(() => {
        if (schoolId) {
            /* fetchData(`http://localhost:5050/api/classes/${schoolId}`, setClasses, "Failed to fetch classes."); */
            fetchFeeTypesOfSchool();
        }
    }, [schoolId]);

    useEffect(() => {
        const fetchClasses = async () => {
          try {
            const response = await fetch(`${baseUrl}classes/${school.id}`);
            if (!response.ok) throw new Error("Failed to fetch classes");
    
            const data = await response.json();
            setClasses(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchClasses();
      }, [school.id]);

    const fetchFeeTypesOfSchool = async () => {
        try {
          const response = await fetch(`${baseUrl}schools/${school.id}/feeTypes`);
          const data = await response.json();
      
          console.log("Raw API Response:", data);
      
          if (Array.isArray(data.feeTypes)) {
            setFeeTypes(data.feeTypes); // Ensure you set the array, not the whole object
            console.log(data.feeTypes)
          } else {
            console.error("Unexpected response format:", data);
          }
        } catch (error) {
          console.error("Error fetching fee types:", error);
        }
      };
      

    /* const fetchData = async (url, setState, errorMessage) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(errorMessage);
            const data = await res.json();
            setState(data || []);
            if (school) {
                setFeeTypes([...school.feeTypes.map((fee) => fee.feeType)]);
            }
        } catch (err) {
            setError(errorMessage);
        }
    }; */

    const fetchTransactions = async () => {
        if (!schoolId || !startDate || !endDate) {
            alert("Please select all filters.");
            return;
        }

        setLoading(true);
        setError("");

        const queryParams = new URLSearchParams({
            schoolId,
            startDate,
            endDate,
            page: currentPage,
            limit: transactionsPerPage,
            ...(selectedClass !== "all" && { selectedClass }),
            ...(selectedFeeType !== "all" && { feeType: selectedFeeType }),
        });

        try {
            const res = await fetch(`${baseUrl}transactions/trans/filterTransaction?${queryParams.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to fetch transactions.");
            const data = await res.json();
            setTransactions(data);
            console.log(`Transactions ${JSON.stringify(data, null, 2)}`)
        } catch (err) {
            setError("Failed to fetch transactions.");
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
    
        // SCHOOL NAME – centered, uppercase, bold
        const schoolName = (school?.school_name || "SCHOOL NAME").toUpperCase();
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(schoolName, doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
    
        // Divider line
        doc.setDrawColor(0);
        doc.line(14, 25, doc.internal.pageSize.getWidth() - 14, 25);
    
        // Transaction Report Title
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text("Transaction Report", 14, 35);
    
        // Date generated
        const generatedDate = new Date().toLocaleString();
        doc.setFontSize(10);
        doc.setTextColor(80);
        doc.text(`Generated on: ${generatedDate}`, 14, 42);
    
        // Fee Type and Class
        doc.setFontSize(11);
        doc.setTextColor(50);
        doc.text(`Fee Type: ${selectedFeeType || "All"}`, 14, 50);
        doc.text(`Class: ${selectedClass || "All"}`, 90, 50); // Put it on the same line, right side
    
        // Another divider
        doc.setDrawColor(150);
        doc.line(14, 55, doc.internal.pageSize.getWidth() - 14, 55);
    
        // Table
        const tableColumn = ["Student Name", "Class", "Fee Type", "Transaction Type", "Amount", "Date"];
        const tableRows = transactions.map(txn => [
            txn.studentName || "N/A",
            txn.className || "Unknown",
            txn.fee_type || "N/A",
            txn.transaction_type || "N/A",
            txn.amount?.toString() || "0.00",
            new Date(txn.date).toLocaleDateString()
        ]);
    
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 60,
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [63, 81, 181],
                textColor: 255,
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            margin: { top: 60 },
        });
    
        // Calculate total amount
        const totalAmount = transactions.reduce((sum, txn) => sum + (parseFloat(txn.amount) || 0), 0).toFixed(2);
    
        // Display total amount
        const pageHeight = doc.internal.pageSize.height;
        const totalY = doc.lastAutoTable.finalY + 10;  // Position after the table
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Amount: GHS ${totalAmount}`, 14, totalY);
    
        // Save the PDF
        doc.save("transaction_report.pdf");
    };
    
    
    
    // Calculate total amount
    const totalAmount = transactions.reduce((total, txn) => total + parseFloat(txn.amount || 0), 0).toFixed(2);

    return (
        <div className="p-6 space-y-6 bg-gradient-to-r from-blue-100 to-blue-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-indigo-800">Transactions Report</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 font-medium">Select Class</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="border p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="all">All Classes</option>
                        {classes.map((cls) => (
                            <option key={cls.id} value={cls.class_name}>{cls.class_name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 font-medium">Select Fee Type</label>
                    <select
                        value={selectedFeeType}
                        onChange={(e) => setSelectedFeeType(e.target.value)}
                        className="border p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="all">All Fee Types</option>
                        {feeTypes.map((feeType, index) => (
                            <option key={feeType.id} value={feeType.fee_type}>{feeType.fee_type}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 font-medium">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 font-medium">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={fetchTransactions}
                    className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                    Generate Report
                </button>
                {transactions.length > 0 && (
                    <button
                        onClick={downloadPDF}
                        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Download as PDF
                    </button>
                )}
            </div>

            {loading && <p className="text-center mt-4 text-gray-700">Loading...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}

            {transactions.length > 0 && (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-6">
                    <h3 className="text-xl font-semibold mb-4">Transaction Details</h3>
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-indigo-200">
                                <th className="border p-3">Student Name</th>
                                <th className="border p-3">Student Class</th>
                                <th className="border p-3">Fee Type</th>
                                <th className="border p-3">Transaction Type</th>
                                <th className="border p-3">Payment Method</th>
                                <th className="border p-3">Amount</th>
                                <th className="border p-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-gray-100">
                                    <td className="border p-3">{txn.studentName || "N/A"}</td>
                                    <td className="border p-3">{txn.className || "Unknown"}</td>
                                    <td className="border p-3">{txn.fee_type}</td>
                                    <td className="border p-3">{txn.transaction_type}</td>
                                    <td className="border p-3">{txn.payment_method}</td>
                                    <td className="border p-3">{txn.amount}</td>
                                    <td className="border p-3">{new Date(txn.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</td>
                                </tr>
                            ))}
                            {/* Row for total amount */}
                            <tr className="bg-indigo-100">
                                <td colSpan="4" className="border p-3 text-right font-semibold">Total Amount</td>
                                <td colSpan="2" className="border p-3">{totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReportPage;
