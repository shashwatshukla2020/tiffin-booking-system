import "./Layout.css";
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

function Layout({ children, title }) {

    const user = getUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const isActive = (path) =>
        location.pathname === path ? "active" : "";

    return (
        <div className="dashboard">

            {/* SIDEBAR */}
            <div className="sidebar">

                <h2>🍱 Tiffin</h2>

                <div className="menu-section">
                    <p
                        className={isActive("/dashboard")}
                        onClick={() => navigate("/dashboard")}
                    >
                        <LayoutDashboard size={18}/> Dashboard
                    </p>
                </div>

                {/* ADMIN */}
                {user?.roles?.includes("ADMIN") && (
                    <div className="menu-section">
                        <h4>Admin</h4>

                        <p 
                        className={isActive("/admin/users")}
                         onClick={() => navigate("/admin/users")}>
                            <Users size={18}/> Manage Users
                        </p>

                        <p>
                            <ShoppingCart size={18}/> All Orders
                        </p>

                        <p>
                            <BarChart3 size={18}/> Reports
                        </p>
                    </div>
                )}

                {/* VENDOR */}
                {user?.roles?.includes("VENDOR") && (
                    <div className="menu-section">
                        <h4>Vendor</h4>

                        <p onClick={() => navigate("/vendor/add-menu")}>
                            <PlusCircle size={18}/> Add Menu
                        </p>

                        <p>
                            <Utensils size={18}/> My Menus
                        </p>

                        <p onClick={() => navigate("/vendor/orders")}>
                            <List size={18}/> Vendor Orders
                        </p>
                    </div>
                )}

                {/* CUSTOMER */}
                {user?.roles?.includes("CUSTOMER") && (
                    <div className="menu-section">
                        <h4>Customer</h4>

                        
                        <p className={isActive("/menu")}
                            onClick={() => navigate("/menu")} >
                             <Utensils size={18}/> View Menu
                        </p>
                         
                        <p className={isActive("/cart")}
                            onClick={() => navigate("/cart")} >
                            <ShoppingCart size={18}/> Cart
                        </p>


                         <p className={isActive("/orders")}
                            onClick={() => navigate("/orders")} >
                            <ShoppingCart size={18}/> My Orders
                        </p>

                         
                    </div>
                )}

                {/* DELIVERY */}
                {user?.roles?.includes("DELIVERY") && (
                    <div className="menu-section">
                        <h4>Delivery</h4>

                        <p>
                            <Truck size={18}/> Assigned Orders
                        </p>

                        <p>
                            <Truck size={18}/> Delivery Status
                        </p>
                    </div>
                )}

                {/* LOGOUT */}
                <div className="logout" onClick={handleLogout}>
                    <LogOut size={18}/> Logout
                </div>

            </div>

            {/* MAIN */}
            <div className="main">

                {/* TOPBAR */}
                <div className="navbar">

                    <h3>{title}</h3>

                    <div className="user-box">

                        <div className="avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <p className="user-name">
                                {user?.name}


                                <span className="role">
                                    <br/>
                                    ({user?.roles?.[0]})
                                </span>
                            </p>
                        </div>

                    </div>

                </div>

                {/* PAGE CONTENT */}
                <div className="page-content">
                    {children}
                </div>

            </div>
        </div>
    );
}

export default Layout;