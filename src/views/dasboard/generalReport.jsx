import { useEffect, useState } from "react";
import { useSchool } from "../../context/schoolContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; "jspdf-autotable";

const ReportPage = () => {
    const { school } = useSchool();
    const schoolId = school?._id;

    const [transactions, setTransactions] = useState([]);
    const [classes, setClasses] = useState([]);
    const [feeTypes, setFeeTypes] = useState([]);
    const [selectedClass, setSelectedClass] = useState("all");
    const [selectedFeeType, setSelectedFeeType] = useState("all");
    
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (schoolId) {
            fetchData(`http://localhost:3000/api/classes/${schoolId}`, setClasses, "Failed to fetch classes.");
        }
    }, [schoolId]);

    const fetchData = async (url, setState, errorMessage) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(errorMessage);
            const data = await res.json();
            setState(data || []);
            if (school) {
                setFeeTypes([ ...school.feeTypes.map((fee) => fee.feeType)]);
            }
        } catch (err) {
            setError(errorMessage);
        }
    };

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
            ...(selectedClass !== "all" && { selectedClass }),
            ...(selectedFeeType !== "all" && { feeType: selectedFeeType }),
        });

        try {
            const res = await fetch(`http://localhost:3000/api/transactions/trans/filterTransaction?${queryParams.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to fetch transactions.");
            const data = await res.json();
            setTransactions(data);
        } catch (err) {
            setError("Failed to fetch transactions.");
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Transaction Report", 10, 10);
        
        const tableColumn = ["Student Name", "Student Class", "Fee Type", "Transaction Type", "Amount", "Date"];
        const tableRows = transactions.map(txn => [
            txn.studentName || "N/A",
            txn.className || "Unknown",
            txn.feeType,
            txn.transactionType,
            txn.amount,
            new Date(txn.date).toLocaleDateString()
        ]);

        autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
        doc.save("transaction_report.pdf");
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold">Transactions Report</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="all">All Classes</option>
                    {classes.map((cls) => (
                        <option key={cls._id} value={cls.className}>
                            {cls.className}
                        </option>
                    ))}
                </select>

                <select 
                    value={selectedFeeType} 
                    onChange={(e) => setSelectedFeeType(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="all">All Fee Types</option>
                    {feeTypes.map((feeType, index) => (
                        <option key={index} value={feeType}>
                            {feeType}
                        </option>
                    ))}
                </select>

                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded w-full" />
            </div>

            <button onClick={fetchTransactions} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Generate Report</button>
            {transactions.length > 0 && <button onClick={downloadPDF} className="mt-4 ml-4 bg-[#0d330cdd] text-white px-4 py-2 rounded">Download as PDF</button>}

            {loading && <p className="text-center mt-4">Loading...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}

            {transactions.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Transaction Report</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Student Name</th>
                                <th className="border p-2">Student Class</th>
                                <th className="border p-2">Fee Type</th>
                                <th className="border p-2">Transaction Type</th>
                                <th className="border p-2">Amount</th>
                                <th className="border p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((txn) => (
                                <tr key={txn._id} className="border">
                                    <td className="border p-2">{txn.studentName || "N/A"}</td>
                                    <td className="border p-2">{txn.className || "Unknown"}</td>
                                    <td className="border p-2">{txn.feeType}</td>
                                    <td className="border p-2">{txn.transactionType}</td>
                                    <td className="border p-2">{txn.amount}</td>
                                    <td className="border p-2">{new Date(txn.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReportPage;
