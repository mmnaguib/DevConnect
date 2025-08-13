import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "../assets/layout.css";
const Layout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
