import { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, loading, signOutUser } = useContext(AuthContext);

  const logOut = () => {
    console.log('Logging out...');
    signOutUser()
      .then(() => {
        toast.success('Successfully signed out!');
      })
      .catch(err => {
        console.error('Logout error:', err);
        toast.error('Failed to sign out.');
      });
  };


  const navLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-purple-600 font-bold border-b-2 border-purple-600'
      : 'text-gray-700';

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" className={navLinkStyle}>
          All Products
        </NavLink>
      </li>

      {user && (
        <>
          {' '}
          <li>
            <NavLink to="/my-products" className={navLinkStyle}>
              My Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-bids" className={navLinkStyle}>
              My Bids
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/create-product" className={navLinkStyle}>
          Create Product
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 border-b">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="text-2xl font-bold">
            <span className="text-gray-900">Smart</span>
            <span className="text-purple-500">Deals</span>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 font-medium">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {user && loading ? (
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border border-purple-500">
                  <img
                    src={user?.photoURL || 'https://i.ibb.co/6w43fS4/user.png'}
                    alt="User"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
              >
                <li>
                  <a className="font-semibold">{user?.displayName || 'User'}</a>
                </li>
                <li>
                  <button onClick={logOut}>Sign Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline btn-primary">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary text-white">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
