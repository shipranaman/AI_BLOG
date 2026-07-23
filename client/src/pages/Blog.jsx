import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);

      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", {
        blogId: id,
      });

      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content: comment,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setComment("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  if (!data) return null;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
            {data.category}
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            {data.title}
          </h1>

          <p className="mt-4 text-lg text-gray-500">{data.subTitle}</p>
        </div>

        <img
          src={data.image}
          alt={data.title}
          className="w-full h-[500px] object-cover rounded-3xl mt-12 shadow-lg"
        />

        <div className="mt-12 text-gray-700 leading-8 text-lg whitespace-pre-line">
          {data.description}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Comments ({comments.length})
          </h2>

          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-gray-200 p-5 shadow-sm"
                >
                  <img
                    src={assets.user_icon}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <span className="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-2 text-gray-600 leading-7">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Leave a Comment
            </h2>

            <form onSubmit={onSubmitHandler} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:border-indigo-500"
                required
              />

              <textarea
                rows="6"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:border-indigo-500 resize-none"
                required
              />

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-8 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;