import { useNavigate } from "react-router";

const StudentClassTable = ({ students, search, feeType }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Fee Type</th>
            <th className="border px-4 py-2">Amount (GHC)</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.filter(s => s.studentName.toLowerCase().includes(search.toLowerCase())).map((student, index) => {
            const fee = student.fees?.find((f) => f.feeType === feeType);
            return (
              <tr 
                key={student._id} 
                className="bg-white hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`student?studentId=${student._id}&feeType=${feeType}`)}
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{student.studentName}</td>
                <td className="border px-4 py-2">{fee ? fee.feeType : "N/A"}</td>
                <td className="border px-4 py-2 text-center">{fee ? fee.amount : "Not Assigned"}</td>
                <td className="border px-4 py-2 text-center">{fee ? fee.status : "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentClassTable;
