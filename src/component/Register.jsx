import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser, createUserWithGoogle, updateUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);
  const [user, setUser] = useState(null);

  const RegisterSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoUrl = e.target.photoUrl.value;

    // Password validation
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    createUser(email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {
            setUser({ ...currentUser, displayName: name, photoURL: photoUrl });
            toast.success("Account created successfully!");
            navigate('/');
          })
          .catch((error) => {
            console.log(error);
            setUser(currentUser);
          });
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong.");
      });
  };

  const handleGoogleLogin = () => {
    createUserWithGoogle()
      .then((result) => {
        const currentUser = result.user;
        setUser(currentUser);
        toast.success(`Welcome back ${currentUser.displayName}`);
        navigate(location?.state || '/');
      })
      .catch((error) => {
        toast.error("Google login failed.");
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-indigo-900 via-indigo-600 to-indigo-400 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-black">
        
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-700">
          Create an Account
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={RegisterSubmit}>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            type="text"
            name="name"
            placeholder="Full Name"
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pr-12"
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 cursor-pointer transition"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            type="url"
            name="photoUrl"
            placeholder="Photo URL (Optional)"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Register
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="mt-5 w-full bg-white text-gray-800 border border-gray-300 hover:border-indigo-500 rounded-lg py-3 flex items-center justify-center gap-3 font-semibold shadow-sm hover:shadow-md transition"
        >
          <FcGoogle size={24} />
          Register with Google
        </button>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-bold underline hover:text-indigo-800">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
