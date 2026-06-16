import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  console.log(location);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* DaisyUI Loading Spinner */}
        <span className="loading loading-spinner loading-lg text-[#0B3B24]"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={'/login'}></Navigate>;
};

export default PrivetRoute;
