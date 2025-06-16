import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from './AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
  const { createUserWithGoogle, setUser, loginUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        toast.success(`Welcome back ${currentUser.displayName}`);
        navigate(`${location?.state ? location.state : '/'}`);
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
        toast.success(`Welcome back ${currentUser.displayName}`);
        navigate(`${location?.state ? location.state : '/'}`);
      })
      .catch((error) => {
        toast.error("Google login failed.");
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c6a1a5] to-[#b98b7b] p-6">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Left - Form Section */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Hello Again!</h2>
          <p className="text-gray-500 mb-6">Let's get back after your 10 days trial</p>

          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              ref={emailRef}
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer">
              Forgot password?
            </div>

            <button
              type="submit"
              className="bg-[#885a5c] hover:bg-[#6d4649] text-white py-3 rounded transition"
            >
              Sign in
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">or continue with</div>

          <div className="flex justify-center">
            <button
              onClick={handleGoogleLogin}
              className="p-2 px-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md flex items-center gap-2"
            >
              <FcGoogle size={24} />
              <span>Login with Google</span>
            </button>
          </div>

          <p className="mt-6 text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 underline font-bold">
              Register here
            </Link>
          </p>
        </div>

        {/* Right - Image Section */}
        <div className="hidden md:block bg-[#e6d1d3]">
          <img
            src="data:image/png;base64,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" // Update path to your login illustration
            alt="login art"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
