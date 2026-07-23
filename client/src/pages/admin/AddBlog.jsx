import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const AddBlog = () => {
  const { axios } = useAppContext();

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Startup");
  const [rewriteStyle, setRewriteStyle] = useState("Professional");
  const [publish, setPublish] = useState(false);
 const generateContent = async () => {

  if (!title) {
    return toast.error("Please enter a blog title");
  }

  try {

    const { data } = await axios.post("/api/blog/generate", {
      prompt: title,
    });

    if (data.success) {
      setDescription(data.content);
      toast.success("Content Generated");
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }

};
const rewriteBlog = async () => {

  if (!description) {
    return toast.error("Generate or write a blog first.");
  }

  try {

    const { data } = await axios.post("/api/blog/rewrite", {
      content: description,
      style: rewriteStyle,
    });

    if (data.success) {

      setDescription(data.content);

      toast.success("Blog rewritten successfully");

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
      const blog = {
        title,
        subTitle,
        description,
        category,
        isPublished: publish,
      };

      const formData = new FormData();

      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);

        setImage(false);
        setTitle("");
        setSubTitle("");
        setDescription("");
        setCategory("Startup");
        setPublish(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-6 md:p-10">
    <form
      onSubmit={onSubmitHandler}
      className="max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-7"
    >
 
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Upload Thumbnail
        </p>

        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : assets.upload_area
            }
            alt=""
            className="w-36 h-28 object-cover rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-500 transition"
          />
        </label>

        <input
          type="file"
          id="image"
          hidden
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blog Title
        </label>

        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sub Title
        </label>

        <input
          type="text"
          placeholder="Enter sub title"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
          required
        />
      </div>

      <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          AI Tools
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={generateContent}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
          >
             Generate Content with AI
          </button>

          <select
            value={rewriteStyle}
            onChange={(e) => setRewriteStyle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
          >
            <option>Professional</option>
            <option>Casual</option>
            <option>Formal</option>
            <option>Beginner Friendly</option>
          </select>

          <button
            type="button"
            onClick={rewriteBlog}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
             Rewrite Content with AI
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blog Description
        </label>

        <textarea
          rows="10"
          placeholder="Write your blog here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none resize-none focus:border-indigo-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blog Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
        >
          <option>Startup</option>
          <option>Technology</option>
          <option>Lifestyle</option>
          <option>Finance</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <input
          id="publish"
          type="checkbox"
          checked={publish}
          onChange={() => setPublish(!publish)}
        />

        <label htmlFor="publish" className="text-gray-700">
          Publish Now
        </label>
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-10 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
      >
        Add Blog
      </button>
    </form>
  </div>
  );
};

export default AddBlog;