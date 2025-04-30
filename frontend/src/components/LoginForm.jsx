// src/components/LoginForm.js
import React, { useState } from "react";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-cyan-400">
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
            onClick={() => setActiveTab("user")}
          >
            <span className="material-icons">User Login</span>
            
          </button>
          <button
            className={`px-4 py-2 flex items-center gap-2 rounded-r ${
              activeTab === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("admin")}
          >
            <span className="material-icons">Admin Login</span>
            
          </button>
        </div>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Sign In
          </button>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
