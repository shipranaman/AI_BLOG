import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");

      if (data.success) {
        setDashboardData(data.dashboardData);
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
        fetchDashboard();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
            <img src={assets.dashboard_icon_1} alt="" className="w-7" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">{dashboardData.blogs}</h2>
            <p className="text-gray-500">Blogs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
            <img src={assets.dashboard_icon_2} alt="" className="w-7" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">{dashboardData.comments}</h2>
            <p className="text-gray-500">Comments</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center">
            <img src={assets.dashboard_icon_3} alt="" className="w-7" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">{dashboardData.drafts}</h2>
            <p className="text-gray-500">Drafts</p>
          </div>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
          <img src={assets.dashboard_icon_4} alt="" className="w-5" />
          <h2 className="text-lg font-semibold">
            Latest Blogs
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Blog Title</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {dashboardData.recentBlogs.map((blog, index) => (

                <tr
                  key={blog.id}
                  className="border-t border-gray-200"
                >

                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    {blog.title}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {blog.isPublished ? (
                      <span className="text-green-600">
                        Published
                      </span>
                    ) : (
                      <span className="text-yellow-600">
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <button
                      onClick={() => togglePublish(blog.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium ${
                        blog.isPublished
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                      }`}
                    >
                      {blog.isPublished ? "Unpublish" : "Publish"}
                    </button>

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

export default Dashboard;