import { createContext, useContext, useState, useEffect } from "react";

const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);


  // Function to update school state after login
  const updateSchool = async (schoolId) => {
    if (!schoolId) return;
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/schools/${schoolId}`);
      const data = await response.json();

      if (response.ok) {
        setSchool(data);
      } else {
        console.error("Failed to fetch school:", data.message);
        setSchool(null);
      }
    } catch (error) {
      console.error("Error fetching school:", error);
      setSchool(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch school from localStorage on initial load
  useEffect(() => {
    const schoolId = localStorage.getItem("schoolId");
    if (schoolId) {
      updateSchool(schoolId);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <SchoolContext.Provider value={{ school, loading, updateSchool }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => useContext(SchoolContext);
