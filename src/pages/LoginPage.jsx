import { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import useAxiosSecure from '../hooks/useAxiosSecure';

const LoginPage = () => {
  const { loading, signInUser, signInGoogle, setLoading } = use(AuthContext);
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const axios = useAxiosSecure();

  const handleSingIn = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const toastId = toast.loading('Signing in...');

    signInUser(email, password)
      .then(() => {
        toast.dismiss(toastId);
        toast.success('Logged in successfully!');
        setLoading(false);
        navigate(location.state || '/');
      })
      .catch(err => {
        setLoading(false);
        toast.dismiss(toastId);
        toast.error(err.message || 'Login failed!');
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then(res => {
        toast.success('Google Login successful!');
        const newUser = {
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        };

        axios.post('/users', newUser).then(data => {
          console.log('data after user save', data.data);
        });

        navigate(location.state || '/');
      })
      .catch(err => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <p className="text-center text-sm">
            Don't have an account?{' '}
            <Link to={'/register'} className="text-primary hover:underline">
              Register Now
            </Link>
          </p>

          <form onSubmit={handleSingIn} className="mt-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="smsowkothasan@gmail.com"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••••••"
                className="input input-bordered w-full"
              />
            </div>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>

            <button className="btn btn-primary w-full mt-4">
              {' '}
              {loading ? (
                <span className="loading loading-spinner text-neutral"></span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            Sign Up With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
