import { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router';

const RegisterPage = () => {
  const { createUser, signInGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    console.log({ name, email, photoURL, password });
    createUser(email, password)
      .then(res => {
        const user = res.user;
        console.log(user);
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            console.log('Profile updated successfully!');
          })
          .catch(error => {
            console.error('Error updating profile:', error);
          });

        navigate(location.state || '/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then(res => {
        console.log(res.user);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Register Now!</h2>
          <p className="text-center text-sm">
            Already have an account?{' '}
            <a href="#" className="text-primary hover:underline">
              Login Now
            </a>
          </p>

          <form onSubmit={handleRegister} className="mt-4 space-y-4">
            {/* Name Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Mariam Swarna"
                className="input input-bordered w-full"
              />
            </div>

            {/* Email Field */}
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

            {/* Image URL Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Image-URL</span>
              </label>
              <input
                name="photoURL"
                type="text"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
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

            <button className="btn btn-primary w-full mt-2">Register</button>
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

export default RegisterPage;
