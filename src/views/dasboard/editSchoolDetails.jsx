import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSchool } from '../../context/schoolContext';
import AppButton from '../../components/button';

const EditSchoolDetails = () => {
  const { school, updateSchoolDetails } = useSchool();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolAddress: '',
    schoolPhone: '',
    schoolWebsite: '',
    schoolEmail: '',
  });

  useEffect(() => {
    if (school) {
      setFormData({
        schoolName: school.schoolName || '',
        schoolAddress: school.schoolAddress || '',
        schoolPhone: school.schoolPhone || '',
        schoolWebsite: school.schoolWebsite || '',
        schoolEmail: school.schoolEmail || '',
      });
    }
  }, [school]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSchoolDetails(formData);
    alert('School details updated successfully!');
    navigate('/dashboard');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#effbff] to-[#edf8ff] px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit School Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="schoolName"
            placeholder="School Name"
            value={formData.schoolName}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="schoolAddress"
            placeholder="School Address"
            value={formData.schoolAddress}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="schoolPhone"
            placeholder="School Phone"
            value={formData.schoolPhone}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="schoolWebsite"
            placeholder="School Website"
            value={formData.schoolWebsite}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="schoolEmail"
            placeholder="School Email"
            value={formData.schoolEmail}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              className="px-6 py-3 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100 transition duration-300"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button type="submit">
              <AppButton name="Save Changes" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSchoolDetails;