import "./Dashboard.css";
import { getUser } from "../services/auth";
import { useNavigate, useLocation } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    BarChart3,
    Utensils,
    PlusCircle,
    List,
    Truck,
    LogOut
} from "lucide-react";

function Dashboard() {

    const user = getUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <div className="dashboard">

            {/* ================= SIDEBAR ================= */}
            <div className="sidebar">
                <h2>🍱 Tiffin</h2>

                <div className="menu-section">
                    <p className={isActive("/dashboard")} onClick={() => navigate("/dashboard")}>
                        <LayoutDashboard size={18}/> Dashboard
                    </p>
                </div>

                {user?.roles?.includes("ADMIN") && (
                    <div className="menu-section">
                        <h4>Admin</h4>
                        <p onClick={() => navigate("/admin/users")}>
                            <Users size={18}/> Manage Users
                        </p>
                        <p><ShoppingCart size={18}/> All Orders</p>
                        <p><BarChart3 size={18}/> Reports</p>
                    </div>
                )}

                {user?.roles?.includes("VENDOR") && (
                    <div className="menu-section">
                        <h4>Vendor</h4>
                        <p onClick={() => navigate("/vendor/add-menu")}>
                            <PlusCircle size={18}/> Add Menu
                        </p>
                        <p><Utensils size={18}/> My Menus</p>

                        <p onClick={() => navigate("/vendor/orders")}>
                            <List size={18}/> Vendor Orders
                            </p>


                        
                    </div>
                )}

                {user?.roles?.includes("CUSTOMER") && (
                    <div className="menu-section">
                        <h4>Customer</h4>
                        <p onClick={() => navigate("/menu")}>
                            <Utensils size={18}/> View Menu
                        </p>
                        <p onClick={() => navigate("/orders")}>
                            <ShoppingCart size={18}/> My Orders
                        </p>
                    </div>
                )}

                {user?.roles?.includes("DELIVERY") && (
                    <div className="menu-section">
                        <h4>Delivery</h4>
                        <p><Truck size={18}/> Assigned Orders</p>
                        <p><Truck size={18}/> Delivery Status</p>
                    </div>
                )}

                <div className="logout" onClick={handleLogout}>
                    <LogOut size={18}/> Logout
                </div>
            </div>

            {/* ================= MAIN ================= */}
            <div className="main">

                {/* NAVBAR */}
                <div className="navbar">
                    <h3>Dashboard Overview</h3>

                    <div className="user-box">
                        <div className="avatar">
                            {user?.sub?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="user-name">{user?.sub}</p>
                            <span className="role">{user?.roles?.[0]}</span>
                        </div>
                    </div>
                </div>

                {/* CARDS */}
                <div className="cards">

                    {user?.roles?.includes("CUSTOMER") && (
                        <>
                            <div className="card gradient-blue">
                                <h3>Available Tiffins</h3>
                                <p>25</p>
                            </div>

                            <div className="card gradient-purple">
                                <h3>My Orders</h3>
                                <p>3</p>
                            </div>

                            <div className="card gradient-green">
                                <h3>Spent</h3>
                                <p>₹1,200</p>
                            </div>
                        </>
                    )}

                    {user?.roles?.includes("VENDOR") && (
                        <>
                            <div className="card gradient-blue">
                                <h3>My Menus</h3>
                                <p>5</p>
                            </div>

                            <div className="card gradient-purple">
                                <h3>Orders Received</h3>
                                <p>18</p>
                            </div>

                            <div className="card gradient-green">
                                <h3>Earnings</h3>
                                <p>₹12,000</p>
                            </div>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Dashboard;