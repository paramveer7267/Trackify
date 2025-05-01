import React from "react";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import AuthScreen from "./AuthScreen";
const HomePage = () => {
  const user = false ;
  return (
    <div>
      {user.role === "user" || user.role === "engineer" ? (
        <UserDashboard />
      ) : user.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <AuthScreen />
      )}
    </div>
  );
};

export default HomePage;
