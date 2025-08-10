import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import DarkModeToggle from "./DarkModeToggle";  // Import the toggle

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logOutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Replace this with your actual image URL
  const logoUrl = "data:image/jpeg;base64,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";

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
          `transition-colors duration-200 px-2 py-2 rounded-md font-medium ${
            isActive
              ? "text-indigo-400 font-semibold"
              : "text-indigo-700 dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          } ${isMobile ? "text-lg" : ""}`
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
        <div className="max-w-screen-xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Typewriter */}
            <div className="flex items-center gap-3 whitespace-nowrap overflow-hidden">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="h-10 w-10 object-contain rounded"
                />
              )}
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-200">
                {text}
              </span>
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
              {/* Dark Mode Toggle */}
              <DarkModeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2">
              {/* Add Dark Mode toggle next to hamburger */}
              <DarkModeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
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
          <div
            className="md:hidden px-6 pb-6 border-t border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900 transition-all duration-300 ease-in-out"
          >
            <nav className="flex flex-col space-y-5">
              {renderLinks(true)}
              {user && (
                <>
                  <UserAvatar />
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
