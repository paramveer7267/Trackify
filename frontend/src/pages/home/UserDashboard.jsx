import React, { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
const UserDashboard = () => {
  const { userLogout } = useAuthStore();

  // useEffect(async () => {
  //   try {
  //     const res = await axios.get(
  //       "http://localhost:5000/api/user/dashboard"
  //     );
  //   } catch (error) {}
  // }, []); // Empty dependency array to run only once on mount
  return (
    <DashboardLayout pageTitle="Client Dashboard">
      UserDashboard
      <button onClick={userLogout}>Logout</button>
    </DashboardLayout>
  );
};

export default UserDashboard;
