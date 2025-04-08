import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router";
import { useSchool } from "../../context/schoolContext";
import { baseUrl } from "../../constants/helpers";

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
        const res = await fetch(`http://localhost:5050/api/classes/${school.id}`);
        if (!res.ok) throw new Error("Failed to fetch classes");

        const data = await res.json();
        setClasses(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (school?.id) fetchClasses();
  }, [school?.id]);

  if (loading) return <p className="text-center mt-10 text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600 text-lg">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {feeType || "Selected Fees"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <NavLink
            key={cls.id}
            to={`classFee?type=${encodeURIComponent(feeType)}&class=${encodeURIComponent(cls.class_name)}&classId=${encodeURIComponent(cls.id)}`}
            className="block border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200 bg-white"
          >
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-700">{cls.class_name}</h2>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SelectedFees;
