import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from './AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
  const { createUserWithGoogle, setUser, loginUser } = use(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value
    loginUser(email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        toast.success(`Welcome back ${currentUser.displayName}`)
        // when user come from another pages that time after complete login redirect this pages 
        navigate(`${location?.state ? location.state : '/'}`)
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.warning(errorCode)
      });

  };


  const handleGoogleLogin = () => {
    createUserWithGoogle()
      .then((result) => {
        const currentUser = result.user;
        setUser(currentUser)
        toast.success(`Welcome back ${currentUser.displayName}`)
        navigate(`${location?.state ? location.state : '/'}`)
      }).catch((error) => {
        toast.error("Google login failed.");
        console.log(error)
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-6 text-red-500">Login Now</h2>



      <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          className="p-2 border rounded"
          ref={emailRef}
        />

        <div className="p-2 border rounded relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
            className="w-full pr-10 h-10 text-base"
          />
          <span
            onClick={togglePassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        <div>
          <button
            type="button"

            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>

      <button
                onClick={handleGoogleLogin}
                className="my-3 bg-white text-black border border-gray-300 p-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
              >
                <FcGoogle size={24} />
                <span>Login with Google (Coming Soon)</span>
              </button>
      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 underline font-bold">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;