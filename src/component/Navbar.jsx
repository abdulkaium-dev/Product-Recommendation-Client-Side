import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logOutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout Success");
        navigate("/");
      })
      .catch(console.error);
  };

  const [text] = useTypewriter({
    words: ["Product Recommendation System"],
    loop: 0,
    delaySpeed: 2000,
    typeSpeed: 70,
    deleteSpeed: 50,
  });

  const commonItems = [
    { name: "Home", path: "/" },
    { name: "Queries", path: "/queries" },
  ];

  const loggedInItems = [
    ...commonItems,
    { name: "Recommendations For Me", path: "/recommended" },
    { name: "My Queries", path: "/my-queries" },
    { name: "My Recommendations", path: "/my-recommendations" },
  ];

  const guestItems = [...commonItems, { name: "Login", path: "/login" }];
  const menuItems = user ? loggedInItems : guestItems;

  const renderLinks = (isMobile = false) =>
    menuItems.map(({ name, path }) => (
      <NavLink
        key={name}
        to={path}
        onClick={() => isMobile && setIsOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600"
        }
      >
        {name}
      </NavLink>
    ));

  const UserAvatar = () => (
    <div
      title={user?.displayName || "User"}
      className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-600 shrink-0"
    >
      <img
        src={user?.photoURL || "/default-avatar.png"}
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <nav className="bg-gradient-to-br from-green-50 to-blue-200 shadow-md w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 text-xl md:text-2xl font-bold text-indigo-600 whitespace-nowrap overflow-hidden">
            <img
              src="https://miro.medium.com/v2/resize:fit:1000/1*zEcZkWeQKuu0Dek-HJkslw.png"
              alt="Logo"
              className="h-8 w-8 shrink-0"
            />
            <span className="truncate">{text}</span>
            <Cursor cursorStyle="|" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {renderLinks()}
            {user && (
              <div className="flex items-center gap-4">
                <UserAvatar />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-3">
            {renderLinks(true)}
            {user && (
              <>
                <UserAvatar />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
