import { NavLink, useLocation } from 'react-router';
import ClassCard from '../../components/dashboard/classCard';

const AddFeesPage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const feeType = searchParams.get('type') || 'Unknown Fee';
  const listOfClasses = [
    { name: 'Pre School', path: '/addSchoolFees', color: '#083C5D'},
     {name: 'Class 1', path: '/addAdmissionFees', color: '#FFBB39'},
     {name: 'Class 2', path: '/addPTAFees', color: '#083C5D'},
     {name: 'Class 3', path: '/addExamFees', color: '#FFBB39'},
     {name: 'Class 4', path: '/addSportsFees', color: '#083C5D'},
     {name: 'Class 5', path: '/addSportsFees', color: '#083C5D'},
     {name: 'Class 6', path: '/addSportsFees', color: '#083C5D'},
     {name: 'J.H.S 1', path: '/addSportsFees', color: '#083C5D'},
     {name: 'J.H.S 2', path: '/addSportsFees', color: '#083C5D'},
     {name: 'J.H.S 3', path: '/addSportsFees', color: '#083C5D'},
 ]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-[200px] mt-[50px]">Add {feeType}</h1>
      <div className='w-[70%] grid grid-cols-6 gap-5'>
        {listOfClasses.map((item) => (<NavLink to={`addClassFee?class=${encodeURIComponent(item.name)}&type=${encodeURIComponent(feeType)}`}> <ClassCard label={item.name}/> </NavLink>))}
      </div>
    </div>
  );
};

export default AddFeesPage;
