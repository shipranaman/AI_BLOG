import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const { axios } = useAppContext();

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");

      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const approveComment = async (id) => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/admin/delete-comment", {
        id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
          <img
            src={assets.comment_icon}
            alt=""
            className="w-5"
          />

          <h2 className="text-lg font-semibold text-gray-800">
            Comments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">
                  Blog Title & Comment
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {comments.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-800">
                      Blog:
                      <span className="font-normal ml-2">
                        {item.title}
                      </span>
                    </p>

                    <p className="mt-2">
                      <span className="font-semibold">
                        Name:
                      </span>{" "}
                      {item.name}
                    </p>

                    <p className="mt-1 text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Comment:
                      </span>{" "}
                      {item.content}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-gray-500 whitespace-nowrap">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-4">

                      {!item.isApproved && (
                        <button
                          onClick={() => approveComment(item.id)}
                          className="w-9 h-9 rounded-full border border-green-500 flex items-center justify-center hover:bg-green-50 transition"
                        >
                          <img
                            src={assets.tick_icon}
                            alt=""
                            className="w-4"
                          />
                        </button>
                      )}

                      <button
                        onClick={() => deleteComment(item.id)}
                        className="w-9 h-9 rounded-full border border-red-500 flex items-center justify-center hover:bg-red-50 transition"
                      >
                        <img
                          src={assets.bin_icon}
                          alt=""
                          className="w-4"
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

export default Comments;