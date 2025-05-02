import React from "react";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import AuthScreen from "./AuthScreen";
import { useAuthStore } from "../../store/authStore";
const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <div>
      {user?.role === "user" || user?.role === "engineer" ? (
        <UserDashboard />
      ) : user?.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <AuthScreen />
      )}
    </div>
  );
};

export default HomePage;
