import React, { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";
const UserDashboard = () => {
  const { userLogout, user } = useAuthStore();

  // useEffect(async () => {
  //   try {
  //     const res = await axios.get(
  //       "http://localhost:5000/api/user/dashboard"
  //     );
  //   } catch (error) {}
  // }, []); // Empty dependency array to run only once on mount
  return (
    <DashboardLayout
      pageTitle={`${user?.role} Dashboard`}
    >
      <div>
        <Link to={"/dashboard/tickets/create"}>
        Create Tickets</Link>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
