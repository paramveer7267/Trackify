// src/components/SignupPage.js
import React from "react";
import { Link } from "react-router";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-cyan-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign up to get started with our ticketing system
        </p>

        <form className="space-y-3  md:space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
              />
            </div>
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm mb-1">
              Account Type
            </label>
            <select className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring">
              <option>User</option>
              <option>Engineer</option>
              {/* <option>Support</option> */}
            </select>
          </div>

          {/* Company & Department */}
          {/* <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">Company</label>
              <input
                type="text"
                placeholder="Company Name"
                className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">Department</label>
              <input
                type="text"
                placeholder="IT, HR, etc."
                className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
              />
            </div>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Create Account
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
