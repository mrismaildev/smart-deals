import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';

const RootLayouts = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default RootLayouts;
