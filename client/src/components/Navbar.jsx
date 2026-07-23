import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const {navigate,token}=useAppContext()
  

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-40 cursor-pointer transition-transform duration-300 hover:scale-105"
        />

        <button
        onClick={() => navigate("/admin")}
          
          className="flex items-center gap-2 rounded-full bg-indigo-600 text-white px-6 sm:px-8 py-2.5 text-sm font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
        >
          Login
          <img
            src={assets.arrow}
            alt="arrow"
            className="w-3 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;