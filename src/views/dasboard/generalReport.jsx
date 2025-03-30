import { useState, useEffect } from "react";

const Card = ({ children }) => (
    <div className="bg-white shadow-md rounded-2xl p-6">{children}</div>
);

const CardContent = ({ children }) => (
    <div className="space-y-4">{children}</div>
);

const ReportPage = () => {
    const [classes, setClasses] = useState([]);
    const [feeTypes, setFeeTypes] = useState([]);
    const [selectedClass, setSelectedClass] = useState("all");
    const [selectedFeeType, setSelectedFeeType] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [transactions, setTransactions] = useState([]);

    /* useEffect(() => {
        // Fetch classes and fee types
        axios.get("/api/classes").then(res => setClasses(res.data));
        axios.get("/api/fee-types").then(res => setFeeTypes(res.data));
    }, []); */

    const generateReport = async () => {
        if (!selectedFeeType || !startDate || !endDate) {
            alert("Please select all required filters.");
            return;
        }
        
  /*       const response = await axios.get("/api/transactions", {
            params: { class: selectedClass, feeType: selectedFeeType, startDate, endDate }
        });
        setTransactions(response.data); */
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold">Generate Report</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectItem value="all">All Classes</SelectItem>
                            {classes.map(cls => (
                                <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                            ))}
                        </Select>
                        
                        <Select value={selectedFeeType} onValueChange={setSelectedFeeType}>
                            {feeTypes.map(fee => (
                                <SelectItem key={fee.id} value={fee.name}>{fee.name}</SelectItem>
                            ))}
                        </Select>
                        
                        <DatePicker selected={startDate} onSelect={setStartDate} placeholder="Start Date" />
                        <DatePicker selected={endDate} onSelect={setEndDate} placeholder="End Date" />
                    </div>
                    <Button onClick={generateReport}>Generate Report</Button>
                </CardContent>
            </Card>

            {transactions.length > 0 && (
                <Card>
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-4">Transaction Report</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Student</th>
                                    <th className="border p-2">Amount</th>
                                    <th className="border p-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((txn, index) => (
                                    <tr key={index} className="border">
                                        <td className="border p-2">{txn.studentName}</td>
                                        <td className="border p-2">{txn.amount}</td>
                                        <td className="border p-2">{new Date(txn.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default ReportPage;