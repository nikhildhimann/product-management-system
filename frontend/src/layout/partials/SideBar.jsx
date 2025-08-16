import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {
  FaBox,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
} from "react-icons/fa";

export default function SideBar() {
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  const linkClasses = (path) =>
    `d-flex align-items-center px-4 py-2 rounded-md transition-colors ${
      location.pathname === path
        ? "bg-primary text-white"
        : "text-white hover-bg-purple-dark"
    }`;

  return (
    <aside
      className="sidebar d-flex flex-column p-3"
      style={{ minHeight: "100vh", width: "240px" }}
    >
      <h2 className="fw-bold mb-4 text-white" style={{ fontSize: "1.5rem" }}>
        Dashboard
      </h2>

      {user ? (
        <>
          <Link to="/dashboard" className={linkClasses("/dashboard")}>
            <FaTachometerAlt className="me-3" /> Dashboard
          </Link>
          <Link
            to="/dashboard/products"
            className={linkClasses("/dashboard/products") }
          >
            <FaBox className="me-3" /> Products
          </Link>
          <Link
            to="/dashboard/profile"
            className={linkClasses("/dashboard/profile")}
          >
            <FaUser className="me-3" /> Profile
          </Link>
          <button
            onClick={logoutUser}
            className="d-flex align-items-center px-4 py-2 rounded-md bg-danger text-white w-100 text-start mt-auto rounded"
            style={{ border: "none" }}
          >
            <FaSignOutAlt className="me-3" /> Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className={linkClasses("/login")}>
            <FaSignInAlt className="me-3" /> Login
          </Link>
          <Link to="/register" className={linkClasses("/register")}>
            <FaUserPlus className="me-3" /> Register
          </Link>
        </>
      )}
    </aside>
  );
}