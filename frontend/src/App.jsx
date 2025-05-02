import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore.js";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
function App() {
  const { user, isCheckingAuth, authCheck } =
    useAuthStore();

  useEffect(() => {
    authCheck();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            !user ? <LoginPage /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/signup"
          element={
            !user ? <SignupPage /> : <Navigate to={"/"} />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
