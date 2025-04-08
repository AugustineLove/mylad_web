import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSchool } from '../../context/schoolContext';
import AppButton from '../../components/button';

const EditSchoolDetails = () => {
  const { school, updateSchoolDetails } = useSchool();
  const navigate = useNavigate();

  const schoolData = JSON.stringify(school);
  console.log(schoolData)

  const [formData, setFormData] = useState({
    schoolName: '',
    schoolAddress: '',
    schoolPhone: '',
    schoolWebsite: '',
    schoolEmail: '',
    schoolPassword: '',
    mobileMoneyProvider: '',
    mobileMoneyNumber: '',
    bankName: '',
    bankAccountNumber: '',
  });

  useEffect(() => {
    if (school) {
      setFormData({
        schoolName: school.school_name || '',
        schoolAddress: school.school_address || '',
        schoolPhone: school.school_phone || '',
        schoolWebsite: school.school_website || '',
        schoolEmail: school.school_email || '',
        schoolPassword: '',
        mobileMoneyProvider: school.mobile_money_provider || '',
        mobileMoneyNumber: school.mobile_money_number || '',
        bankName: school.bank_name || '',
        bankAccountNumber: school.bank_account_number || '',
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

  const inputStyle = "border border-gray-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#effbff] to-[#edf8ff] px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit School Details</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="schoolName" placeholder="School Name" value={formData.schoolName} onChange={handleChange} className={inputStyle} required />
          <input type="text" name="schoolAddress" placeholder="School Address" value={formData.schoolAddress} onChange={handleChange} className={inputStyle} required />
          <input type="text" name="schoolPhone" placeholder="School Phone" value={formData.schoolPhone} onChange={handleChange} className={inputStyle} required />
          <input type="text" name="schoolWebsite" placeholder="School Website" value={formData.schoolWebsite} onChange={handleChange} className={inputStyle} required />
          <input type="email" name="schoolEmail" placeholder="School Email" value={formData.schoolEmail} onChange={handleChange} className={inputStyle} required />
          <input type="password" name="schoolPassword" placeholder="Change Password (optional)" value={formData.schoolPassword} onChange={handleChange} className={inputStyle} />

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold text-gray-700">Payment Info</h2>
          <input type="text" name="mobileMoneyProvider" placeholder="Mobile Money Provider (e.g., MTN)" value={formData.mobileMoneyProvider} onChange={handleChange} className={inputStyle} />
          <input type="text" name="mobileMoneyNumber" placeholder="Mobile Money Number" value={formData.mobileMoneyNumber} onChange={handleChange} className={inputStyle} />
          <input type="text" name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} className={inputStyle} />
          <input type="text" name="bankAccountNumber" placeholder="Bank Account Number" value={formData.bankAccountNumber} onChange={handleChange} className={inputStyle} />

          <div className="flex justify-between items-center mt-8">
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
