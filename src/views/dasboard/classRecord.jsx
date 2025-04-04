import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSchool } from "../../context/schoolContext";
import { NavLink } from "react-router";
import { baseUrl } from "../../constants/helpers";

const ClassRecord = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { school } = useSchool();

  // Get feeType from the URL
  const queryParams = new URLSearchParams(useLocation().search);
  const feeType = queryParams.get("type");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/classes/${school.id}`);
        if (!response.ok) throw new Error("Failed to fetch classes");

        const data = await response.json();
        setClasses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [school._id]);

  if (loading) return <p className="text-center mt-4 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4 text-lg">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-indigo-600">{feeType}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <NavLink 
            key={classItem.id} 
            to={`classDetails?type=${encodeURIComponent(feeType)}&class=${encodeURIComponent(classItem.class_name)}&classId=${encodeURIComponent(classItem.id)}`}
          >
            <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer text-center text-white font-semibold text-lg">
              {classItem.class_name}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ClassRecord;
