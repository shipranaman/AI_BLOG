import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="border-r border-gray-200 min-h-full pt-6">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-8 md:min-w-64 cursor-pointer ${
            isActive
              ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600"
              : "text-gray-700 hover:bg-gray-50"
          }`
        }
      >
        <img
          src={assets.home_icon}
          alt=""
          className="w-5 min-w-5"
        />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/addblog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-8 md:min-w-64 cursor-pointer ${
            isActive
              ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600"
              : "text-gray-700 hover:bg-gray-50"
          }`
        }
      >
        <img
          src={assets.add_icon}
          alt=""
          className="w-5 min-w-5"
        />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>

      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-8 md:min-w-64 cursor-pointer ${
            isActive
              ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600"
              : "text-gray-700 hover:bg-gray-50"
          }`
        }
      >
        <img
          src={assets.list_icon}
          alt=""
          className="w-5 min-w-5"
        />
        <p className="hidden md:inline-block">Blog Lists</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-8 md:min-w-64 cursor-pointer ${
            isActive
              ? "bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600"
              : "text-gray-700 hover:bg-gray-50"
          }`
        }
      >
        <img
          src={assets.comment_icon}
          alt=""
          className="w-5 min-w-5"
        />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;