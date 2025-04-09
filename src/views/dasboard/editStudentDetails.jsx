import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AppButton from '../../components/button';
import { useSchool } from '../../context/schoolContext';
import { baseUrl } from '../../constants/helpers';

const EditStudentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;

  const school = useSchool();

  console.log(`School id: ${JSON.stringify(school.school.id)}`)
  const classOptions = [
    'Creche', 'Nursery 1', 'Nursery 2', 'KG 1', 'KG 2',
    'Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5',
    'Basic 6', 'Basic 7', 'Basic 8', 'Basic 9'
  ];

  

  const genderOptions = ['Male', 'Female'];

  const [firstName, setFirstName] = useState(student?.student_first_name || '');
  const [surname, setSurname] = useState(student?.student_surname || '');
  const [otherNames, setOtherNames] = useState(student?.student_other_names || '');
  const [gender, setGender] = useState(student?.student_gender || '');
  const [address, setAddress] = useState(student?.student_address || '');
  const [className, setClassName] = useState(student?.student_class_name || '');

  const [parentFirstName, setParentFirstName] = useState(student?.student_parent_first_name || '');
  const [parentSurname, setParentSurname] = useState(student?.student_parent_surname || '');
  const [parentNumber, setParentNumber] = useState(student?.student_parent_number || '');

  if (!student) return <p>No student data provided.</p>;

  const handleUpdate = async () => {
    if (!firstName || !surname || !className || !gender || !address || !parentFirstName || !parentSurname || !parentNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}students/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: student.id,
          schoolId: school.school.id,
          studentFirstName: firstName,
          studentSurname: surname,
          studentOtherNames: otherNames,
          studentGender: gender,
          studentAddress: address,
          studentClass: className,
          studentParentFirstName: parentFirstName,
          studentParentSurname: parentSurname,
          studentParentNumber: parentNumber,
        }),
      });

      if (response.ok) {
        alert('Student details updated successfully!');
        navigate('/dashboard'); // go back to previous page
        window.location.reload();
      } else {
        const err = await response.json();
        alert(`Update failed: ${err.message}`);
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Student Details</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Surname</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Other Names</label>
          <input
            type="text"
            value={otherNames}
            onChange={(e) => setOtherNames(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            {genderOptions.map((g, i) => (
              <option key={i} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Class</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Class</option>
            {classOptions.map((cls, i) => (
              <option key={i} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-2">Parent Information</h3>

          <label className="block text-gray-700">Parent First Name</label>
          <input
            type="text"
            value={parentFirstName}
            onChange={(e) => setParentFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-3"
          />

          <label className="block text-gray-700">Parent Surname</label>
          <input
            type="text"
            value={parentSurname}
            onChange={(e) => setParentSurname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-3"
          />

          <label className="block text-gray-700">Parent Phone Number</label>
          <input
            type="tel"
            value={parentNumber}
            onChange={(e) => setParentNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <AppButton name="Save Changes" onClick={handleUpdate} />
      </div>
    </div>
  );
};

export default EditStudentDetails;
