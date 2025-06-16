import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { createUser, createUserWithGoogle, updateUser } = use(AuthContext)
  //   password show
  const [showPassword, setShowPassword, setUser] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

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
            setUser({ ...currentUser, displayName: name, photoURL: photoUrl })
            navigate('/')
            toast.success("Account created successfully!");
          }).catch((error) => {
            console.log(error)
            setUser(currentUser)
          });

      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage || "Something went wrong.");
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
    <div className="register-form min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Register Please</h2>
      <form className="flex flex-col space-y-4 w-full max-w-sm " onSubmit={RegisterSubmit}>
        <input className="p-2 border rounded" type="text" name="name" placeholder="Name" required /> <br />
        <input className="p-2 border rounded" type="email" name="email" placeholder="Email" required /> <br />

        {/* password */}
        <div className="p-2 border rounded" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
            style={{ paddingRight: '35px', width: '100%', height: '40px', fontSize: '16px' }}
          />
          <span
            onClick={togglePassword}
            style={{
              position: 'absolute',
              right: '10px',
              top: '30px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#555'
            }}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div> <br />
        <input className="p-2 border rounded" type="url" name="photoUrl" placeholder="Photo URL (Optional)" /> <br />
        <button type="submit" className="submit  bg-red-500 text-white p-3 rounded-lg">Register</button> <br />
        
      </form>
      <button
          onClick={handleGoogleLogin}
          className="mb-3 bg-white text-black border border-gray-300 p-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
        >
          <FcGoogle size={24} />
          <span>Login with Google (Coming Soon)</span>
        </button>
      <p>
        Already have an account? <Link to="/login" className="text-blue-600 underline font-bold">Login here</Link>
      </p>
    </div>
  );
};

export default Register;