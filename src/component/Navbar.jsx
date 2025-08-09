import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
    words: ["ProductRecommender"],
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
          `transition-colors duration-200 px-3 py-2 rounded-md font-medium ${
            isActive
              ? "text-indigo-600 font-semibold"
              : "text-indigo-700 dark:text-indigo-200 hover:text-indigo-600"
          }`
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
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-indigo-50 dark:bg-indigo-900 shadow-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 text-2xl font-bold text-indigo-600 dark:text-indigo-200 whitespace-nowrap overflow-hidden">
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
                    className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-indigo-700 dark:text-indigo-200 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-6 pb-4 border-t border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900">
            <nav className="flex flex-col space-y-4">
              {renderLinks(true)}
              {user && (
                <>
                  <UserAvatar />
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition mt-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
}
