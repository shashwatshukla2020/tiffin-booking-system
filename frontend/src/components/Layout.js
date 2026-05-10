import "./Layout.css";

import { getUser } from "../services/auth";

import { useNavigate, useLocation } from "react-router-dom";

import {
  // COMMON
  LayoutDashboard,
  LogOut,

  // ADMIN
  Users,
  ShoppingCart,
  BarChart3,

  // VENDOR
  Utensils,
  PlusCircle,
  List,
  Tags,

  // DELIVERY
  Truck,
} from "lucide-react";

function Layout({ children, title }) {
  // =========================================================
  // HOOKS
  // =========================================================

  const user = getUser();

  const navigate = useNavigate();

  const location = useLocation();

  // =========================================================
  // HELPERS
  // =========================================================

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  // =========================================================
  // COMPONENT
  // =========================================================

  return (
    <div className="dashboard">
      {/* =====================================================
                SIDEBAR
            ===================================================== */}

      <div className="sidebar">
        {/* LOGO */}
        <h2>🍱 Tiffin</h2>

        {/* =====================================================
                    COMMON
                ===================================================== */}

        <div className="menu-section">
          <p
            className={isActive("/dashboard")}
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </p>
        </div>

        {/* =====================================================
                    ADMIN
                ===================================================== */}

        {user?.roles?.includes("ADMIN") && (
          <div className="menu-section">
            <h4>Admin</h4>

            {/* MANAGE USERS */}
            <p
              className={isActive("/admin/users")}
              onClick={() => navigate("/admin/users")}
            >
              <Users size={18} />
              Manage Users
            </p>

            {/* ALL ORDERS */}
            <p>
              <ShoppingCart size={18} />
              All Orders
            </p>

            {/* REPORTS */}
            <p>
              <BarChart3 size={18} />
              Reports
            </p>
          </div>
        )}

        {/* =====================================================
                    VENDOR
                ===================================================== */}

        {user?.roles?.includes("VENDOR") && (
          <div className="menu-section">
            <h4>Vendor</h4>

            {/* ADD MENU */}
            <p
              className={isActive("/vendor/add-menu")}
              onClick={() => navigate("/vendor/add-menu")}
            >
              <PlusCircle size={18} />
              Add Menu
            </p>

            {/* MANAGE MENUS */}
            {/* <p
                            className={isActive("/vendor/menus")}
                            onClick={() => navigate("/vendor/menus")}
                        >

                            <Utensils size={18} />

                            My Menus

                        </p> */}

            {/* CATEGORY MASTER */}
            <p
              className={isActive("/vendor/categories")}
              onClick={() => navigate("/vendor/categories")}
            >
              <Tags size={18} />
              Add Categories
            </p>

            {/* VENDOR ORDERS */}
            <p
              className={isActive("/vendor/orders")}
              onClick={() => navigate("/vendor/orders")}
            >
              <List size={18} />
              Vendor Orders
            </p>
          </div>
        )}

        {/* =====================================================
                    CUSTOMER
                ===================================================== */}

        {user?.roles?.includes("CUSTOMER") && (
          <div className="menu-section">
            <h4>Customer</h4>

            {/* VIEW MENU */}
            <p className={isActive("/menu")} onClick={() => navigate("/menu")}>
              <Utensils size={18} />
              View Menu
            </p>

            {/* CART */}
            <p className={isActive("/cart")} onClick={() => navigate("/cart")}>
              <ShoppingCart size={18} />
              Cart
            </p>

            {/* MY ORDERS */}
            <p
              className={isActive("/orders")}
              onClick={() => navigate("/orders")}
            >
              <List size={18} />
              My Orders
            </p>
          </div>
        )}

        {/* =====================================================
                    DELIVERY
                ===================================================== */}

        {user?.roles?.includes("DELIVERY") && (
          <div className="menu-section">
            <h4>Delivery</h4>

            {/* ASSIGNED ORDERS */}
            <p>
              <Truck size={18} />
              Assigned Orders
            </p>

            {/* DELIVERY STATUS */}
            <p>
              <Truck size={18} />
              Delivery Status
            </p>
          </div>
        )}

        {/* =====================================================
                    LOGOUT
                ===================================================== */}

        <div className="logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </div>
      </div>

      {/* =====================================================
                MAIN SECTION
            ===================================================== */}

      <div className="main">
        {/* =================================================
                    TOP NAVBAR
                ================================================= */}

        <div className="navbar">
          {/* PAGE TITLE */}
          <h3>{title}</h3>

          {/* USER INFO */}
          <div className="user-box">
            {/* AVATAR */}
            <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>

            {/* USER DETAILS */}
            <div>
              <p className="user-name">
                {user?.name}

                <span className="role">
                  <br />({user?.roles?.[0]})
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
                    PAGE CONTENT
                ================================================= */}

        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
