import React, { useState } from 'react';
import AppButton from '../../components/button';
import TransactionTable from '../../components/dashboard/transactionTable';
import { useLocation } from 'react-router';
import { useSchool } from '../../context/schoolContext';

const StudentsDetails = () => {
  const location = useLocation();
  const student = location.state?.student;
  const { school } = useSchool()

  const [paymentAmount, setPaymentAmount] = useState('');
  const [creditFeeType, setCreditFeeType] = useState('');
  const [debitAmount, setDebitAmount] = useState('');
  const [debitFeeType, setDebitFeeType] = useState('');
  const [dueDate, setDueDate] = useState("");
  const [debitDueDate, setDebitDueDate] = useState("");

  if (!student) return <p>No student data available.</p>;

  const totalDebt = student.fees.reduce((acc, fee) => acc + fee.amount, 0);

  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  const addTransaction = async (studentId, schoolId, amount, feeType, date, transactionType) => {
    try {
      console.log(date)
        console.log("Trying to create a transaction")
      const response = await fetch(`http://localhost:3000/api/transactions/${student._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, schoolId, amount, feeType, date, transactionType }),
      });
  
      if (!response.ok) throw new Error("Failed to record transaction");
      console.log("Transaction recorded successfully")
    } catch (err) {
      console.error(err);
    }
  };

  // Handle credit (payment)
  const handlePayment = async () => {
    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0 || !creditFeeType || !dueDate) {
      alert("Enter a valid amount, select a fee type, and choose a due date!");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/students/pay/${student._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          studentId: student._id, 
          amountPaid: Number(paymentAmount), 
          feeType: creditFeeType,
        }),
      });
  
      if (response.ok) {
        addTransaction(student._id, school._id, Number(paymentAmount), creditFeeType, dueDate, "Credit");
        alert(`Successfully credited $${paymentAmount} to ${creditFeeType}.`);
        setPaymentAmount('');
        refreshPage();
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  
  

  // Handle debit (add debt)
  const handleDebit = async () => {
    if (!debitAmount || isNaN(debitAmount) || debitAmount <= 0 || !debitFeeType || !debitDueDate) {
      alert("Enter a valid amount, select a fee type, and choose a due date!");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/students/debit/${student._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          studentId: student._id,
          amount: Number(debitAmount), 
          feeType: debitFeeType,
        }),
      });
  
      if (response.ok) {
        addTransaction(student._id, school._id, Number(debitAmount), debitFeeType, debitDueDate, "Debit");
        alert(`Successfully added $${debitAmount} for ${debitFeeType}.`);
        setDebitAmount('');
        refreshPage();
      } else {
        alert("Failed to add debt. Please try again.");
      }
    } catch (error) {
      console.error("Error adding debt:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div>
      <div className='flex space-x-[5%]'>
        <div className='flex space-x-[30px] items-start'>
          <div className='rounded-[100%] bg-gray-200 w-[210px] h-[210px]'></div>
          <div className='flex flex-col'>
            <h1 className='font-bold text-2xl'>{student.studentName}</h1>
            <p>Class: {student.studentClassName}</p>
            <p className='font-bold text-red-500'>Total Outstanding Debt: GH₵{totalDebt}</p>

            {/* Payment Section */}
            <h2 className="font-bold mt-[20px]">Make a Payment</h2>
            <select 
              value={creditFeeType} 
              onChange={(e) => setCreditFeeType(e.target.value)} 
              className="border border-[#B5AFAF] p-2 rounded w-[500px] mb-[10px]"
            >
              <option value="" disabled>Select Fee Type</option>
              {student.fees
                .filter(fee => fee.amount > 0) // Only show fees with outstanding balances
                .map((fee, index) => (
                  <option key={index} value={fee.feeType}>{fee.feeType}</option>
              ))}
            </select>
            <div>
                <input
                type="number"
                placeholder="Enter amount to pay"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="border border-[#B5AFAF] p-2 rounded w-[500px] mb-[5px]"
                />
                <input
               type="date"
               value={dueDate}
               onChange={(e) => setDueDate(e.target.value)}
             />
            </div>
            <p className='text-green-500 mb-[10px]'>
              This amount will be credited to {student.studentName}'s account.
            </p>
            <AppButton name="Pay" onClick={handlePayment} />

            {/* Add Debt Section */}
            <h2 className="font-bold mt-[20px]">Add Debt</h2>
            <select 
              value={debitFeeType} 
              onChange={(e) => setDebitFeeType(e.target.value)} 
              className="border border-[#B5AFAF] p-2 rounded w-[500px] mb-[10px]"
            >
              <option value="" disabled>Select Fee Type</option>
              {student.fees.map((fee, index) => (
                <option key={index} value={fee.feeType}>{fee.feeType}</option>
              ))}
            </select>
            <div>
            <input
              type="number"
              placeholder="Enter amount to add"
              value={debitAmount}
              onChange={(e) => setDebitAmount(e.target.value)}
              className="border border-[#B5AFAF] p-2 rounded w-[500px] mb-[5px]"
            />
            <input
               type="date"
               value={debitDueDate}
               onChange={(e) => setDebitDueDate(e.target.value)}
             />
            </div>
            <p className='text-red-400 mb-[10px]'>
              This amount will be added to {student.studentName}'s outstanding debt.
            </p>
            <AppButton name="Add Debt" onClick={handleDebit} />
          </div>
        </div>

        {/* Display Individual Fee Balances */}
        <div className='flex flex-col w-[50%] '>
          <h2 className="font-bold text-2xl ">All Outstanding Fees</h2>
          <table className="w-full border-collapse border border-gray-300 mt-[10px]">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Fee Type</th>
                <th className="border border-gray-300 p-2">Amount Owed (GH₵)</th>
              </tr>
            </thead>
            <tbody>
              {student.fees.map((fee, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{fee.feeType}</td>
                  <td className="border border-gray-300 p-2">{fee.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsDetails;
