import FeeCatCard from "../../components/dashboard/feetCatCard";
import { NavLink } from "react-router"; // Fixed import
import StudentTable from "../../components/dashboard/studentsTable";
import { useStudents } from "../../context/studentsContext";

const DashboardHome = () => {
  const { students, loading } = useStudents();
  /* const listofFees = [
    { name: "School Fees", path: "/addSchoolFees", color: "#083C5D" },
    { name: "Admission Fees", path: "/addAdmissionFees", color: "#FFBB39" },
    { name: "PTA Fees", path: "/addPTAFees", color: "#083C5D" },
    { name: "Exam Fees", path: "/addExamFees", color: "#FFBB39" },
    { name: "Sports Fees", path: "/addSportsFees", color: "#083C5D" },
  ]; */

  return (
    <>
      <div className="flex space-x-1">
        <div className="flex justify-center items-center bg-gray-200 border border-gray-400 w-[150px] rounded-2xl p-[10px] text-black">
          <NavLink to={`addFees`}>All Fees</NavLink>
        </div>
        <div className="flex justify-center items-center bg-gray-200 border border-gray-400 w-[150px] rounded-2xl p-[10px] text-black">
          <NavLink to={`addStudent`}>Add Student</NavLink>
        </div>
        <div className="flex justify-center items-center bg-gray-200 border border-gray-400 w-[170px] rounded-2xl p-[10px] text-black">
          <NavLink to={`generalReport`}>Generate Report</NavLink>
        </div>
       
      </div>

      {/* <div className="mt-[50px] flex space-x-[50px] justify-center items-center">
        {listofFees.map((list) => (
          <NavLink key={list.name} to={`addFees?type=${encodeURIComponent(list.name)}`}>
            <FeeCatCard label={list.name} bgColor={list.color} />
          </NavLink>
        ))}
      </div> */}

      <div className="mt-[20px]">
        {loading ? (
          <p>Loading students...</p>
        ) : students && students.length > 0 ? (
          <StudentTable studentsData={students} />
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </>
  );
};

export default DashboardHome;
