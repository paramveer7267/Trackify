import DashboardLayout from "./DashboardLayout";
import TicketDashboard from "./TicketDashboard";

const AdminDashboard = () => {
  return (
    <DashboardLayout pageTitle={"Admin Dashboard"}>
      <TicketDashboard />
    </DashboardLayout>
  );
};

export default AdminDashboard;
