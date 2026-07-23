import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { useAppContext } from "../../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase());

    const matchesCategory =
      menu === "All" || blog.category === menu;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
      <div className="flex flex-wrap justify-center gap-4">
        {blogCategories.map((item, index) => (
          <button
            key={index}
            onClick={() => setMenu(item)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              menu === item
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-8 mt-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Blogs Found
            </h2>

            <p className="mt-2 text-gray-500">
              There are no published blogs matching your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;