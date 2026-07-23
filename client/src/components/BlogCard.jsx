import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${blog.id}`)}
      className="cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
      />

      <div className="p-5">
        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
          {blog.category}
        </span>

        <h2 className="mt-4 text-xl font-bold text-gray-900 line-clamp-2">
          {blog.title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3">
          {blog.subTitle}
        </p>

        <button className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;