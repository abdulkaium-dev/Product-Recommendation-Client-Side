import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router";
import Footer from "../component/Footer";


const Root = () => {
  return (
    <div>
      <header role="banner">
        <Navbar />
      </header>

      <main role="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
};

export default Root;
