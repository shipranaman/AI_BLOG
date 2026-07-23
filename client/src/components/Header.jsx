import React from "react";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 text-center">

        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
          Explore Trending Blogs
        </span>

        <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">
          Discover
          <span className="text-indigo-600"> Stories </span>
          That Matter
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-gray-600">
          Explore insightful articles on AI, technology, programming,
          career, and more. Stay informed with curated content and
          engage with the community through meaningful discussions.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button className="rounded-full bg-indigo-600 px-8 py-3 text-white font-medium shadow-lg transition duration-300 hover:bg-indigo-700">
            Explore Blogs
          </button>
        </div>

      </div>
    </section>
  );
};

export default Header;