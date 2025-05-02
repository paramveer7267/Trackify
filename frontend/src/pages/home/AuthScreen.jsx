import React from "react";
import { Link } from "react-router";

const AuthScreen = () => {
  return <div>AuthScreen
    <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
    <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
  </div>;
};

export default AuthScreen;
