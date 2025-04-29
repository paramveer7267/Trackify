import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthForm() {
  const [formType, setFormType] = useState(null); // 'user' or 'admin'
  const [loginType, setLoginType] = useState(null); // 'user-login' or 'admin-login'

  const closeLoginModal = () => setLoginType(null);

  return (
    <div className="relative w-full h-screen bg-gray-100 flex overflow-hidden">
      {/* User Panel */}
      <div className="w-1/2 relative bg-white flex items-center justify-center">
        <button
          onClick={() => setLoginType("user-login")}
          className="absolute top-4 left-4 text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
        >
          User Login
        </button>

        <button
          onClick={() => setFormType("user")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Open User Signup
        </button>
      </div>

      {/* Admin Panel */}
      <div className="w-1/2 relative bg-gray-200 flex items-center justify-center">
        <button
          onClick={() => setLoginType("admin-login")}
          className="absolute top-4 right-4 text-purple-700 border border-purple-700 px-4 py-2 rounded hover:bg-purple-700 hover:text-white transition"
        >
          Admin Login
        </button>

        <button
          onClick={() => setFormType("admin")}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg"
        >
          Open Admin Signup
        </button>
      </div>

      {/* Animated Signup Forms */}
      <AnimatePresence>
        {formType === "user" && (
          <motion.div
            key="user-form"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full bg-white flex items-center justify-center p-6 shadow-xl z-20"
          >
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">User Signup</h2>
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  className="block w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="block w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="block w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Register as User
                </button>
              </form>
              <button
                className="absolute top-4 right-4 text-gray-500"
                onClick={() => setFormType(null)}
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {formType === "admin" && (
          <motion.div
            key="admin-form"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full bg-white flex items-center justify-center p-6 shadow-xl z-20"
          >
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Admin Signup</h2>
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  className="block w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="block w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="block w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Register as Admin
                </button>
              </form>
              <button
                className="absolute top-4 left-4 text-gray-500"
                onClick={() => setFormType(null)}
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN MODAL WITH BACKDROP */}
      <AnimatePresence>
        {loginType && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLoginModal}
            />

            {/* Dialog */}
            <motion.div
              key="login-dialog"
              className="fixed inset-0 flex items-center justify-center z-40"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={closeLoginModal}
                >
                  ✕
                </button>
                <h2 className="text-xl font-bold mb-4">
                  {loginType === "user-login"
                    ? "User Login"
                    : "Admin Login"}
                </h2>
                <form>
                  <input
                    type="email"
                    placeholder="Email"
                    className="block w-full mb-3 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="block w-full mb-4 p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                  >
                    Login
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
