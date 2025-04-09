import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../constants/helpers";

const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to update school state after login
  const updateSchool = async (schoolId) => {
    if (!schoolId) return;
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}schools/${schoolId}`);
      const data = await response.json();

      console.log(`Schools data: ${data.id}`)

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

  // Function to update school details
  const updateSchoolDetails = async (updatedDetails) => {
    if (!school) return;
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}schools/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedDetails, schoolId: school.id }),
      });

      const data = await response.json();
      console.log(`Updated data: ${data}`)

      if (response.ok) {
        setSchool(data.updatedSchool);
        toast.success("School details updated successfully!");
      } else {
        toast.error("Failed to update school details: " + data.message);
      }
    } catch (error) {
      toast.error("Error updating school details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch school from localStorage on initial load
  useEffect(() => {
    const schoolId = localStorage.getItem("schoolId");
    console.log(schoolId)
    if (schoolId) {
      updateSchool(schoolId);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <SchoolContext.Provider value={{ school, loading, updateSchool, updateSchoolDetails }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => useContext(SchoolContext);