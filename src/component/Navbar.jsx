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
    words: ["Junno"],
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
    <nav className="bg-gradient-to-br from-green-50 to-blue-200 shadow-md w-full overflow-x-hidden mb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 text-xl md:text-2xl font-bold text-indigo-600 whitespace-nowrap overflow-hidden">
            <img
              src="data:image/jpeg;base64,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"
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
