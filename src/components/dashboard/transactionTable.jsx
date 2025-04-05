
const TransactionTable = ({ transactions }) => {
  if (!transactions.length) {
    return <p className="text-center mt-4 text-red-500">No transactions found.</p>;
  }

  return (
    <div className="p-6 w-full mx-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">#</th>
            <th className="border p-2">Amount (GHC)</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Transaction Type</th>
            <th className="border p-2">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="text-center border hover:bg-gray-100">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{transaction.amount}</td>
              <td className="border p-2">{new Date(transaction.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
            }</td>
              {transaction.transactionType === "Credit" ? <td className="border p-2 border-black text-red-500">{transaction.transaction_type}</td> : <td className="border p-2 border-black text-green-500">{transaction.transaction_type}</td> }
              <td className="border p-2">{transaction.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
