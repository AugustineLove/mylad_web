import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
