import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSchool } from "../../context/schoolContext";
import { NavLink } from "react-router";

const SelectedFees = () => {
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
        const response = await fetch(`http://localhost:3000/api/classes/${school._id}`);
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

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="max-w-3xl p-4">
      <h1 className="text-2xl font-bold text-center mb-4">{feeType}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <NavLink 
            key={classItem._id} 
            to={`classFee?type=${encodeURIComponent(feeType)}&class=${encodeURIComponent(classItem.className)}&classId=${encodeURIComponent(classItem._id)}`}
          >
            <div className="p-4 border rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 cursor-pointer text-center">
              {classItem.className}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SelectedFees;
