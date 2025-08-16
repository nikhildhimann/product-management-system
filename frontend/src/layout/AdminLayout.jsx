import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./partials/SideBar";
import Footer from "../components/Footer";
import Navbar from "./partials/Navbar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f5f7ff" }}>
      {/* Sidebar */}
      <div style={{ transition: "width 0.3s", width: sidebarOpen ? 240 : 0, overflow: "hidden" }}>
        <SideBar />
      </div>
      {/* Main Content */}
      <div className="flex-grow-1">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="container-fluid py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;