import React, { useState, useContext, useEffect } from "react";
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

  useEffect(() => {
    // Define CSS variables for colors (light and dark mode)
    const root = document.documentElement;
    root.style.setProperty("--color-bg-light", "#eef2ff"); // Indigo 50
    root.style.setProperty("--color-bg-dark", "#312e81"); // Indigo 900
    root.style.setProperty("--color-text-light", "#3730a3"); // Indigo 700
    root.style.setProperty("--color-text-dark", "#e0e7ff"); // Indigo 200
    root.style.setProperty("--color-primary", "#4f46e5"); // Indigo 600
  }, []);

  // Navigation routes
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
              ? "text-primary font-semibold"
              : "text-text-light dark:text-text-dark hover:text-primary"
          }`
        }
      >
        {name}
      </NavLink>
    ));

  const UserAvatar = () => (
    <div
      title={user?.displayName || "User"}
      className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shrink-0"
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
      {/* Navbar background full width and sticky */}
      <nav
        className="fixed top-0 left-0 w-full z-50"
        style={{
          backgroundColor: "var(--color-bg-light)",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Navbar content wrapper with max width and padding */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-3 text-2xl font-bold text-primary whitespace-nowrap overflow-hidden">
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
                    className="bg-primary text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Logout"
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
                className="p-2 rounded-md text-text-light hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
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
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
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
            className="md:hidden px-6 pb-4 border-t"
            style={{ backgroundColor: "var(--color-bg-light)", borderColor: "#c7d2fe" }}
          >
            <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
              {renderLinks(true)}
              {user && (
                <>
                  <UserAvatar />
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="bg-primary text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition mt-2"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </nav>

      {/* Spacer div so content is not hidden behind fixed navbar */}
      <div className="h-16" aria-hidden="true"></div>

      {/* Dark mode CSS */}
      <style jsx="true">{`
        @media (prefers-color-scheme: dark) {
          nav {
            background-color: var(--color-bg-dark) !important;
            box-shadow: 0 1px 4px rgba(255, 255, 255, 0.1);
          }
          nav a {
            color: var(--color-text-dark);
          }
          nav a:hover,
          nav a.active {
            color: var(--color-primary);
          }
          button.bg-primary {
            background-color: var(--color-primary);
          }
          button.bg-primary:hover {
            background-color: #4338ca;
          }
          button.text-white {
            color: #e0e7ff;
          }
          .md:hidden {
            background-color: var(--color-bg-dark);
          }
        }
      `}</style>
    </>
  );
}
