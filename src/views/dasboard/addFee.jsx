import { useLocation } from 'react-router';
import AppButton from '../../components/button';
import StudentTable from '../../components/dashboard/studentsTable';
import { studentsData } from '../../constants/studentData';

const AddClassFeePage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const className = searchParams.get('class') || 'Unknown Class';
  const feeType = searchParams.get('type') || 'Unknown Fee';

  const filteredStudents = studentsData.filter(student => student.class === className);

  return (
    <div>
      <h1 className="text-2xl font-bold mt-[50px] mb-[30px]">{`Update ${feeType} for ${className} students`}</h1>
      {/* Add form inputs for the fee details */}
      <input
          type="text"
          placeholder="Enter amount to add"
          className="border border-[#B5AFAF] p-2 rounded w-1/2 mb-[20px]"
        />

        <p className='text-red-400 mb-[20px]'>NB: This amount will be added to the debt of all {className} students. Notifications will be sent to guardians about an addition of School fees to their children’s 
        outstanding debt, if any. Fees can also be updated for individual students.</p>
        <AppButton name="Add Fees"/>

        <StudentTable studentsData={filteredStudents} filteredClass={className} />
    </div>
  );
};

export default AddClassFeePage;
