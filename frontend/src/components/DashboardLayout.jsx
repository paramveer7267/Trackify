import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, pageTitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const overlay = isSidebarOpen ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
      onClick={toggleSidebar}
    />
  ) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sidebar for mobile */}
      <Sidebar
        isMobile={true}
        toggleSidebar={toggleSidebar}
      />

      {/* Overlay */}
      {overlay}

      <div className="md:pl-64 flex flex-col flex-1">
        <Header
          toggleSidebar={toggleSidebar}
          pageTitle={pageTitle}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar
          isMobile={false}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
