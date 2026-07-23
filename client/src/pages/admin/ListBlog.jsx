import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const { axios } = useAppContext();

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/blog/delete", { id });

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async (id) => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", { id });

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
          <img
            src={assets.dashboard_icon_4}
            alt=""
            className="w-5"
          />
          <h2 className="text-lg font-semibold text-gray-800">
            All Blogs
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Blog Title</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog, index) => (
                <tr
                  key={blog.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-500">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800 max-w-md truncate">
                    {blog.title}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {blog.isPublished ? (
                      <span className="text-green-600 font-medium">
                        Published
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-medium">
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">

                      <button
                        onClick={() => togglePublish(blog.id)}
                        className="px-3 py-1 border rounded-md text-xs hover:bg-gray-100 transition"
                      >
                        {blog.isPublished ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition"
                      >
                        <img
                          src={assets.cross_icon}
                          alt="Delete"
                          className="w-3"
                        />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default ListBlog;