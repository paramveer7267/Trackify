import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore.js";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserDashboard from "./pages/home/UserDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import CreateTicket from "./pages/CreateTicket.jsx";
import MyTickets from "./pages/MyTickets.jsx";
import TicketDetails from "./pages/TicketDetails.jsx";
import AssignedTickets from "./pages/AssignedTickets.jsx";
import "./App.css";
import Users from "./pages/Users.jsx";
import AllTickets from "./pages/AllTickets.jsx";
function App() {
  const { user, isCheckingAuth, authCheck } =
    useAuthStore();

  console.log("user", user);
  useEffect(() => {
    authCheck();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <HomePage />
            ) : user.role === "user" ||
              user.role === "engineer" ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !user ? <LoginPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/signup"
          element={
            !user ? <SignupPage /> : <Navigate to="/" />
          }
        />

        <Route
          path="/dashboard"
          element={
            user?.role === "user" ||
            user?.role === "engineer" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dashboard/tickets/create"
          element={
            user ? <CreateTicket /> : <Navigate to="/" />
          }
        />
        <Route
          path="/dashboard/tickets"
          element={
            user ? <MyTickets /> : <Navigate to="/" />
          }
        />
        <Route
          path="/tickets/:id"
          element={
            user ? <TicketDetails /> : <Navigate to="/" />
          }
        />
        <Route
          path="/dashboard/assigned-tickets"
          element={
            user ? <AssignedTickets /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/users"
          element={user ? <Users /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/all-tickets"
          element={
            user ? <AllTickets /> : <Navigate to="/" />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
