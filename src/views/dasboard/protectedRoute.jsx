import { Navigate, useLocation } from "react-router";
import { useSchool } from "../../context/schoolContext";

const ProtectedRoute = ({ children }) => {
  const { school } = useSchool();
  const location = useLocation();

  // Show nothing or a loader until context is fully loaded
  if (!school) {
    return null; // Or <LoadingSpinner />
  }

  const isExpired = new Date(school.registration_expiration_date) <= new Date();

  // If user is already on upgrade page, don't redirect again
  if (isExpired && location.pathname !== "/dashboard/upgradeSubscription") {
    return <Navigate to="/dashboard/upgradeSubscription" />;
  }

  return children;
};

export default ProtectedRoute;
