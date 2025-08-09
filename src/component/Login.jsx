import React, { useRef, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from './AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
  const { createUserWithGoogle, setUser, loginUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        toast.success(`Welcome back ${currentUser.displayName || 'User'}`);
        navigate(location?.state?.from || '/');
      })
      .catch((error) => {
        toast.warning(error.code);
      });
  };

  const handleGoogleLogin = () => {
    createUserWithGoogle()
      .then((result) => {
        const currentUser = result.user;
        setUser(currentUser);
        toast.success(`Welcome back ${currentUser.displayName || 'User'}`);
        navigate(location?.state?.from || '/');
      })
      .catch((error) => {
        toast.error(error.message || 'Google login failed.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="p-12 flex flex-col justify-center">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="text-indigo-600 text-5xl animate-pulse">✴️</div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 text-center drop-shadow-sm">
            Welcome back!
          </h1>
          <p className="text-center text-gray-500 mb-10 text-sm tracking-wide">
            Please enter your details to sign in.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col space-y-6">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              ref={emailRef}
              autoComplete="username"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                required
                className="border border-gray-300 rounded-md px-4 py-3 w-full pr-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                autoComplete="current-password"
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600 transition"
                aria-label="Toggle Password Visibility"
                role="button"
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </span>
            </div>


            {/* Submit */}
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 shadow-md transition"
            >
              Log In
            </button>
          </form>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="mt-8 flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-indigo-500 rounded-lg py-3 text-gray-800 font-semibold shadow-sm transition"
          >
            <FcGoogle size={24} />
            Log in with Google
          </button>

          {/* Register Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-500 underline font-bold hover:text-indigo-600"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-indigo-50 to-white p-10 rounded-tr-2xl rounded-br-2xl shadow-lg">
          <img
            src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4685.jpg"
            alt="Login Illustration"
            className="max-w-[360px] object-contain rounded-lg drop-shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
