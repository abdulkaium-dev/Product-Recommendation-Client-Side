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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#2b1f5c] via-[#c62861] to-[#e44d26] p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-black">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form className="space-y-4" onSubmit={RegisterSubmit}>
          <input className="w-full p-3 border rounded" type="text" name="name" placeholder="Name" required />
          <input className="w-full p-3 border rounded" type="email" name="email" placeholder="Email" required />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 border rounded"
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <input className="w-full p-3 border rounded" type="url" name="photoUrl" placeholder="Photo URL (Optional)" />
          <button type="submit" className="w-full bg-[#885a5c] hover:bg-[#6d4649] text-white py-3 rounded transition ">
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full bg-white text-black border p-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
        >
          <FcGoogle size={24} />
          <span>Register with Google</span>
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
