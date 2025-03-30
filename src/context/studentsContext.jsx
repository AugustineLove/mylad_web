import { createContext, useContext, useState, useEffect } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateStudents = async (schoolId) => {
        if (!schoolId) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/students/${schoolId}`);
            const data = await response.json();

            if (response.ok) {
                setStudents(data);
            } else {
                console.error("Failed to fetch students:", data.message);
                setStudents(null);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            setStudents(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch students when the provider loads
    useEffect(() => {
        const schoolId = localStorage.getItem("schoolId");
        if (schoolId) {
            updateStudents(schoolId);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <StudentContext.Provider value={{ students, loading, updateStudents }}>
            {children}
        </StudentContext.Provider>
    );
};

// Custom hook for accessing student context
export const useStudents = () => useContext(StudentContext);
