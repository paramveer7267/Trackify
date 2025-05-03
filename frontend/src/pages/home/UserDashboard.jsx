import React, { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";
const UserDashboard = () => {
  const { userLogout, user } = useAuthStore();

  return (
    <DashboardLayout
      pageTitle={`${user?.role?.charAt(0).toUpperCase() +
        user?.role?.slice(1)} Dashboard`}
    >
      <div>
        <Link to={"/dashboard/tickets/create"}>
        Create Tickets</Link>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
