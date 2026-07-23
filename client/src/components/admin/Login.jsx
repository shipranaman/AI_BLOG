import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken, navigate } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);

        axios.defaults.headers.common["Authorization"] = data.token;

        setToken(data.token);

        toast.success("Login Successful");

        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            <span className="text-indigo-600">Admin</span> Login
          </h1>

          <p className="mt-3 text-gray-500">
            Enter your credentials to access the admin panel.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-600"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold transition hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;