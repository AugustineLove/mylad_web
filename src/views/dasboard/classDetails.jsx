import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { baseUrl } from "../../constants/helpers";

const ClassDetails = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);
  const classId = queryParams.get("classId");
  const className = queryParams.get("class");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${baseUrl}classes/${classId}/students`);
        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.log(err.message); // Log the error without displaying it to the user
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [classId]);

  useEffect(() => {
    setFilteredStudents(
      students.filter(student =>
        `${student.studentSurname} ${student.studentFirstname} ${student.studentOtherNames}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, students]);

  const handleSelectAll = (event) => {
    setSelectedStudents(event.target.checked ? students.map(s => s._id) : []);
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const promoteSelectedStudents = async () => {
    if (selectedStudents.length === 0) return alert("No students selected for promotion.");
    setPromoting(true);
    try {
      console.log(`Selected students: ${selectedStudents}`)
      const response = await fetch(`${baseUrl}classes/promote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, students: selectedStudents }),
      });
      if (!response.ok) throw new Error("Failed to promote students");
      alert("Students promoted successfully!");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    } finally {
      setPromoting(false);
    }
  };

  const deleteSelectedStudents = async () => {
    if (selectedStudents.length === 0) return alert("No students selected for deletion.");
    if (!window.confirm("Are you sure you want to delete the selected students?")) return;
    setDeleting(true);
    try {
      console.log("Deleting student IDs: ", selectedStudents); // Debugging log
      const response = await fetch(`${baseUrl}students/deletion/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentIds: selectedStudents }),
      });

      if (!response.ok) throw new Error("Failed to delete students");
      alert("Students deleted successfully!");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-600">{className} - Students' Fee Summary</h1>
      <div className="mb-6 flex items-center gap-4 justify-between">
        <input
          type="text"
          placeholder="Search student by name..."
          className="p-3 w-3/4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            className={`bg-blue-600 text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-blue-700 ${promoting ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={promoteSelectedStudents}
            disabled={promoting}
          >
            {promoting ? "Promoting..." : "Promote Selected"}
          </button>
          <button
            className={`bg-red-600 text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-red-700 ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={deleteSelectedStudents}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Selected"}
          </button>
        </div>
      </div>

      {/* Display empty table if no students */}
      {students.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No students available in this class.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2">
                  <input type="checkbox" onChange={handleSelectAll} checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0} />
                </th>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Total Owing (GH₵)</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredStudents.map((student, index) => {
                const totalOwing = student.fees?.reduce((acc, fee) => acc + fee.amount, 0) || 0;
                return (
                  <tr key={student._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-center">
                      <input type="checkbox" onChange={() => handleSelectStudent(student._id)} checked={selectedStudents.includes(student._id)} />
                    </td>
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3">{`${student.studentSurname} ${student.studentFirstName} ${student.studentOtherNames}`}</td>
                    <td className="px-4 py-3 text-center">GH₵ {totalOwing.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                        onClick={() => navigate('/dashboard/studentDetails', { state: { student } })}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
