import React from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 pt-6 md:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
