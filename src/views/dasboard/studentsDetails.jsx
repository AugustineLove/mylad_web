import React, { useState } from 'react';
import AppButton from '../../components/button';
import { NavLink, useLocation } from 'react-router';
import { useSchool } from '../../context/schoolContext';
import { baseUrl } from '../../constants/helpers';

const StudentsDetails = () => {
  const location = useLocation();
  const student = location.state?.student;
  const { school } = useSchool();

  const [paymentAmount, setPaymentAmount] = useState('');
  const [creditFeeType, setCreditFeeType] = useState('');
  const [debitAmount, setDebitAmount] = useState('');
  const [debitFeeType, setDebitFeeType] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [debitDueDate, setDebitDueDate] = useState('');

  if (!student) return <p>No student data available.</p>;

  const totalDebt = student.fees.reduce((acc, fee) => acc + fee.amount, 0);

  const refreshPage = () => {
    window.location.reload();
  };

  const sendMessageToParent = async (messageTo, price, parentName, studentName, feeType) => {
    try {
      const response = await fetch(`${baseUrl}parents/sendMessage`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messageTo,
          messageFrom: `${school.schoolName.split(' ').map(word => word.charAt(0).toUpperCase()).join('')}-MYWARD`,
          message: `Dear Mr/Mrs. ${parentName} we've received your payment of GH₵${price}.00 for ${studentName}'s ${feeType}. Thank you for your timely payment, stay safe!`
        }),
      });

      console.log(`Sending message response: ${response.body}`)

      if (!response.ok) throw new Error('Failed to send message');
    } catch (error) {
      console.error(error);
    }
  };

  const addTransaction = async (studentId, schoolId, amount, feeType, date, transactionType) => {
    try {
      const response = await fetch(`${baseUrl}transactions/${student._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, schoolId, amount, feeType, date, transactionType }),
      });

      if (!response.ok) throw new Error("Failed to record transaction");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = async () => {
    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0 || !creditFeeType || !dueDate) {
      alert("Enter a valid amount, select a fee type, and choose a due date!");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/students/pay/${student._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student._id, amountPaid: Number(paymentAmount), feeType: creditFeeType }),
      });

      if (response.ok) {
        addTransaction(student._id, school._id, Number(paymentAmount), creditFeeType, dueDate, "Credit");
        sendMessageToParent(student.studentParentNumber, Number(paymentAmount), student.studentParentSurname, student.studentFirstName, creditFeeType);
        alert(`Successfully credited GH₵${paymentAmount} to ${creditFeeType}.`);
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

  const handleDebit = async () => {
    if (!debitAmount || isNaN(debitAmount) || debitAmount <= 0 || !debitFeeType || !debitDueDate) {
      alert("Enter a valid amount, select a fee type, and choose a due date!");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}students/debit/${student._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student._id, amount: Number(debitAmount), feeType: debitFeeType }),
      });

      if (response.ok) {
        addTransaction(student._id, school._id, Number(debitAmount), debitFeeType, debitDueDate, "Debit");
        alert(`Successfully added GH₵${debitAmount} for ${debitFeeType}.`);
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
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-start space-x-12 bg-white shadow-lg rounded-lg p-6">
        <div className="flex space-x-8 items-center w-[60%]">
          <div className="w-[150px] h-[150px] rounded-full bg-gray-200 flex justify-center items-center text-3xl">{`${student.studentFirstName.charAt(0)}${student.studentSurname.charAt(0)}`}</div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-semibold text-gray-800">{student.studentFirstName} {student.studentSurname}</h1>
            <p className="text-lg text-gray-600">Class: {student.studentClassName}</p>
            <p className="text-xl font-bold text-red-500">Outstanding Debt: GH₵{totalDebt}</p>
            <NavLink to={'editStudentDetails'} className='text-blue-500'>Edit details</NavLink>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="flex flex-col w-[40%] space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">All Outstanding Fees</h2>
          <table className="w-full table-auto border-collapse border border-gray-300 rounded-md shadow-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-gray-600">Fee Type</th>
                <th className="p-3 text-left text-gray-600">Debt (GH₵)</th>
              </tr>
            </thead>
            <tbody>
              {student.fees.map((fee, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 text-gray-700">{fee.feeType}</td>
                  <td className="p-3 text-gray-700">{fee.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex space-x-12 mt-8">
        {/* Payment Section */}
        <div className="flex flex-col w-[50%] bg-gray-50 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Make a Payment</h2>
          <select
            value={creditFeeType}
            onChange={(e) => setCreditFeeType(e.target.value)}
            className="p-2 rounded-md border border-gray-300"
          >
            <option value="" disabled>Select Fee Type</option>
            {student.fees.filter(fee => fee.amount > 0).map((fee, index) => (
              <option key={index} value={fee.feeType}>{fee.feeType}</option>
            ))}
          </select>
          <div className="flex flex-col space-y-4">
            <input
              type="number"
              placeholder="Enter payment amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="p-2 rounded-md border border-gray-300"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
          <p className="text-sm text-gray-600">This amount will be credited to {student.studentFirstName}'s account.</p>
          <AppButton name="Pay" onClick={handlePayment} />
        </div>

        {/* Add Debt Section */}
        <div className="flex flex-col w-[50%] bg-gray-50 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Add Debt</h2>
          <select
            value={debitFeeType}
            onChange={(e) => setDebitFeeType(e.target.value)}
            className="p-2 rounded-md border border-gray-300"
          >
            <option value="" disabled>Select Fee Type</option>
            {student.fees.map((fee, index) => (
              <option key={index} value={fee.feeType}>{fee.feeType}</option>
            ))}
          </select>
          <div className="flex flex-col space-y-4">
            <input
              type="number"
              placeholder="Enter debt amount"
              value={debitAmount}
              onChange={(e) => setDebitAmount(e.target.value)}
              className="p-2 rounded-md border border-gray-300"
            />
            <input
              type="date"
              value={debitDueDate}
              onChange={(e) => setDebitDueDate(e.target.value)}
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
          <p className="text-sm text-gray-600">This amount will be added to {student.studentFirstName}'s outstanding debt.</p>
          <AppButton name="Add Debt" onClick={handleDebit} />
        </div>
      </div>
    </div>
  );
};

export default StudentsDetails;
