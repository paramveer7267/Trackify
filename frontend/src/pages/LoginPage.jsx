import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin, adminLogin, isLoggingIn } = useAuthStore();
  const userLoginInfo = { email: "user@gmail.com", password: "user@123" };
  const adminLoginInfo = { email: "admin@gmail.com", password: "admin@123" };
  const engineerLoginInfo = {
    email: "engineer@gmail.com",
    password: "engineer@123",
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "user") {
      userLogin({
        email,
        password,
      });
    } else {
      adminLogin({
        email,
        password,
      });
    }
  };
  function handleAdd(email, password) {
    setEmail(email);
    setPassword(password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-cyan-400">
      <Link
        to="/"
        className="absolute top-4 left-4 text-white text-lg font-bold"
      >
        Home
      </Link>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to your account to continue
        </p>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 flex items-center gap-2 rounded-l ${
              activeTab === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => {
              setActiveTab("user");
              setEmail("");
              setPassword("");
            }}
          >
            <span className="material-icons">User / Engineer Login</span>
          </button>
          <button
            className={`px-4 py-2 flex items-center gap-2 rounded-r ${
              activeTab === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => {
              setActiveTab("admin");
              setEmail("");
              setPassword("");
            }}
          >
            <span className="material-icons">Admin Login</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            disabled={isLoggingIn}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isLoggingIn ? "Signing" : "Sign In"}
          </button>
          {activeTab === "user" ? (
            <div className="flex">
              <button
                type="button"
                className="flex items-center bg-gray-400 hover:bg-gray-500 shadow-lg p-2 rounded-2xl text-white scale-90 hover:scale-100 active:scale-95 transition-transform cursor-pointer"
                onClick={() =>
                  handleAdd(userLoginInfo.email, userLoginInfo.password)
                }
              >
                Add User
              </button>
              <button
                type="button"
                className="flex items-center bg-gray-400 hover:bg-gray-500 shadow-lg p-2 rounded-2xl text-white scale-90 hover:scale-100 active:scale-95 transition-transform cursor-pointer"
                onClick={() =>
                  handleAdd(engineerLoginInfo.email, engineerLoginInfo.password)
                }
              >
                Add Engineer
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                className="flex items-center bg-gray-400 hover:bg-gray-500 shadow-lg p-2 rounded-2xl text-white scale-90 hover:scale-100 active:scale-95 transition-transform cursor-pointer"
                onClick={() =>
                  handleAdd(adminLoginInfo.email, adminLoginInfo.password)
                }
              >
                Add Admin
              </button>
            </div>
          )}

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
