import Layout from "../components/Layout";
import { getUser } from "../services/auth";

import {
    UtensilsCrossed,
    ShoppingBag,
    IndianRupee,
    Clock3,
    Truck,
    Star,
    TrendingUp,
    CheckCircle2,
    Users,
    ShieldCheck,
    PackageCheck,
    ClipboardList,
    UserCog,
    Bike,
    ChefHat
} from "lucide-react";

import "./Dashboard.css";

function Dashboard() {

    const user = getUser();

    const role = user?.roles?.[0];

    return (

        <Layout title="Dashboard">

            <div className="dashboard-page">

                {/* ================= HERO ================= */}

                <div className="dashboard-hero">

                    <div>

                        <h1>
                            Welcome Back 👋
                        </h1>

                        <p>

                            {role === "ADMIN" &&
                                "Manage users, monitor orders and control the complete tiffin platform."}

                            {role === "CUSTOMER" &&
                                "Enjoy fresh homemade meals delivered right to your doorstep."}

                            {role === "VENDOR" &&
                                "Manage menus, track customer orders and grow your tiffin business."}

                            {role === "DELIVERY" &&
                                "Track assigned deliveries and update delivery status efficiently."}

                        </p>

                    </div>

                    <div className="hero-badge">

                        <TrendingUp size={18} />

                        <span>

                            {role === "ADMIN" && "Platform Overview"}
                            {role === "CUSTOMER" && "Daily Fresh Meals"}
                            {role === "VENDOR" && "Vendor Panel"}
                            {role === "DELIVERY" && "Delivery Dashboard"}

                        </span>

                    </div>

                </div>

                {/* ========================================================= */}
                {/* ================= ADMIN DASHBOARD ======================= */}
                {/* ========================================================= */}

                {role === "ADMIN" && (

                    <>
                        <div className="cards">

                            <div className="card gradient-blue">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <Users size={22} />
                                    </div>

                                    <span className="growth">
                                        +18%
                                    </span>

                                </div>

                                <div>

                                    <h3>Total Users</h3>

                                    <p>120</p>

                                </div>

                            </div>

                            <div className="card gradient-purple">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <ClipboardList size={22} />
                                    </div>

                                    <span className="growth">
                                        +25 Orders
                                    </span>

                                </div>

                                <div>

                                    <h3>Total Orders</h3>

                                    <p>340</p>

                                </div>

                            </div>

                            <div className="card gradient-green">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <IndianRupee size={22} />
                                    </div>

                                    <span className="growth">
                                        Revenue
                                    </span>

                                </div>

                                <div>

                                    <h3>Total Revenue</h3>

                                    <p>₹58K</p>

                                </div>

                            </div>

                        </div>

                        <div className="dashboard-grid">

                            <div className="dashboard-box">

                                <div className="box-header">

                                    <h2>
                                        <ShieldCheck size={18} />
                                        Admin Activity
                                    </h2>

                                </div>

                                <div className="activity-list">

                                    <div className="activity-item">

                                        <UserCog
                                            size={18}
                                            className="info-icon"
                                        />

                                        <div>

                                            <h4>New Vendor Approved</h4>

                                            <p>
                                                Vendor account approved successfully
                                            </p>

                                        </div>

                                    </div>

                                    <div className="activity-item">

                                        <ClipboardList
                                            size={18}
                                            className="success-icon"
                                        />

                                        <div>

                                            <h4>Orders Increased</h4>

                                            <p>
                                                Daily orders increased by 15%
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="dashboard-box">

                                <div className="box-header">

                                    <h2>
                                        <TrendingUp size={18} />
                                        Platform Status
                                    </h2>

                                </div>

                                <div className="delivery-card">

                                    <div className="delivery-top">

                                        <h3>
                                            System Performance
                                        </h3>

                                        <span className="live-badge">
                                            Stable
                                        </span>

                                    </div>

                                    <div className="delivery-progress">
                                        <div className="progress-line"></div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </>
                )}

                {/* ========================================================= */}
                {/* ================= CUSTOMER DASHBOARD ==================== */}
                {/* ========================================================= */}

                {role === "CUSTOMER" && (

                    <>
                        <div className="cards">

                            <div className="card gradient-blue">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <UtensilsCrossed size={22} />
                                    </div>

                                    <span className="growth">
                                        +12%
                                    </span>

                                </div>

                                <div>

                                    <h3>Available Tiffins</h3>

                                    <p>25</p>

                                </div>

                            </div>

                            <div className="card gradient-purple">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <ShoppingBag size={22} />
                                    </div>

                                    <span className="growth">
                                        +4 Orders
                                    </span>

                                </div>

                                <div>

                                    <h3>My Orders</h3>

                                    <p>3</p>

                                </div>

                            </div>

                            <div className="card gradient-green">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <IndianRupee size={22} />
                                    </div>

                                    <span className="growth">
                                        This Month
                                    </span>

                                </div>

                                <div>

                                    <h3>Total Spent</h3>

                                    <p>₹1,200</p>

                                </div>

                            </div>

                        </div>

                        <div className="dashboard-grid">

                            {/* RECENT ACTIVITY */}
                            <div className="dashboard-box">

                                <div className="box-header">

                                    <h2>
                                        <Clock3 size={18} />
                                        Recent Activity
                                    </h2>

                                </div>

                                <div className="activity-list">

                                    <div className="activity-item">

                                        <CheckCircle2
                                            size={18}
                                            className="success-icon"
                                        />

                                        <div>

                                            <h4>Order Delivered</h4>

                                            <p>
                                                Veg Deluxe Thali delivered successfully
                                            </p>

                                        </div>

                                    </div>

                                    <div className="activity-item">

                                        <Truck
                                            size={18}
                                            className="info-icon"
                                        />

                                        <div>

                                            <h4>Order Out for Delivery</h4>

                                            <p>
                                                Paneer Combo is on the way
                                            </p>

                                        </div>

                                    </div>

                                    <div className="activity-item">

                                        <Star
                                            size={18}
                                            className="warning-icon"
                                        />

                                        <div>

                                            <h4>Rate Your Meal</h4>

                                            <p>
                                                Share your experience with yesterday’s order
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* DELIVERY STATUS */}
                            <div className="dashboard-box">

                                <div className="box-header">

                                    <h2>
                                        <Truck size={18} />
                                        Delivery Status
                                    </h2>

                                </div>

                                <div className="delivery-card">

                                    <div className="delivery-top">

                                        <h3>
                                            Today's Delivery
                                        </h3>

                                        <span className="live-badge">
                                            Live
                                        </span>

                                    </div>

                                    <div className="delivery-progress">

                                        <div className="progress-line"></div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </>
                )}

                {/* ========================================================= */}
                {/* ================= VENDOR DASHBOARD ====================== */}
                {/* ========================================================= */}

                {role === "VENDOR" && (

                    <>
                        <div className="cards">

                            <div className="card gradient-blue">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <ChefHat size={22} />
                                    </div>

                                    <span className="growth">
                                        +5
                                    </span>

                                </div>

                                <div>

                                    <h3>Total Menus</h3>

                                    <p>18</p>

                                </div>

                            </div>

                            <div className="card gradient-purple">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <ClipboardList size={22} />
                                    </div>

                                    <span className="growth">
                                        Today
                                    </span>

                                </div>

                                <div>

                                    <h3>Orders Received</h3>

                                    <p>42</p>

                                </div>

                            </div>

                            <div className="card gradient-green">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <IndianRupee size={22} />
                                    </div>

                                    <span className="growth">
                                        Earnings
                                    </span>

                                </div>

                                <div>

                                    <h3>Total Earnings</h3>

                                    <p>₹18K</p>

                                </div>

                            </div>

                        </div>

                        <div className="dashboard-grid">

                            <div className="dashboard-box">

                                <div className="box-header">

                                    <h2>
                                        <Clock3 size={18} />
                                        Vendor Activity
                                    </h2>

                                </div>

                                <div className="activity-list">

                                    <div className="activity-item">

                                        <PackageCheck
                                            size={18}
                                            className="success-icon"
                                        />

                                        <div>

                                            <h4>New Order Received</h4>

                                            <p>
                                                3 new customer orders received
                                            </p>

                                        </div>

                                    </div>

                                    <div className="activity-item">

                                        <ChefHat
                                            size={18}
                                            className="warning-icon"
                                        />

                                        <div>

                                            <h4>Menu Updated</h4>

                                            <p>
                                                Paneer Combo price updated
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="dashboard-box">

                                <div className="box-header">

                                    <h2>
                                        <Truck size={18} />
                                        Delivery Progress
                                    </h2>

                                </div>

                                <div className="delivery-card">

                                    <div className="delivery-top">

                                        <h3>
                                            Active Deliveries
                                        </h3>

                                        <span className="live-badge">
                                            Running
                                        </span>

                                    </div>

                                    <div className="delivery-progress">
                                        <div className="progress-line"></div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </>
                )}

                {/* ========================================================= */}
                {/* ================= DELIVERY DASHBOARD ==================== */}
                {/* ========================================================= */}

                {role === "DELIVERY" && (

                    <>
                        <div className="cards">

                            <div className="card gradient-blue">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <Bike size={22} />
                                    </div>

                                    <span className="growth">
                                        Today
                                    </span>

                                </div>

                                <div>

                                    <h3>Assigned Orders</h3>

                                    <p>12</p>

                                </div>

                            </div>

                            <div className="card gradient-purple">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <Truck size={22} />
                                    </div>

                                    <span className="growth">
                                        Delivered
                                    </span>

                                </div>

                                <div>

                                    <h3>Completed Deliveries</h3>

                                    <p>8</p>

                                </div>

                            </div>

                            <div className="card gradient-green">

                                <div className="card-top">

                                    <div className="card-icon">
                                        <IndianRupee size={22} />
                                    </div>

                                    <span className="growth">
                                        Earnings
                                    </span>

                                </div>

                                <div>

                                    <h3>Delivery Earnings</h3>

                                    <p>₹2,500</p>

                                </div>

                            </div>

                        </div>

                        <div className="dashboard-grid">

                            <div className="dashboard-box">

                                <div className="box-header">

                                    <h2>
                                        <Truck size={18} />
                                        Delivery Activity
                                    </h2>

                                </div>

                                <div className="activity-list">

                                    <div className="activity-item">

                                        <CheckCircle2
                                            size={18}
                                            className="success-icon"
                                        />

                                        <div>

                                            <h4>Order Delivered</h4>

                                            <p>
                                                Delivered order to Sector 5
                                            </p>

                                        </div>

                                    </div>

                                    <div className="activity-item">

                                        <Bike
                                            size={18}
                                            className="info-icon"
                                        />

                                        <div>

                                            <h4>Next Delivery Assigned</h4>

                                            <p>
                                                Pickup from vendor kitchen
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="dashboard-box">

                                <div className="box-header">

                                    <h2>
                                        <TrendingUp size={18} />
                                        Delivery Performance
                                    </h2>

                                </div>

                                <div className="delivery-card">

                                    <div className="delivery-top">

                                        <h3>
                                            Delivery Completion
                                        </h3>

                                        <span className="live-badge">
                                            80%
                                        </span>

                                    </div>

                                    <div className="delivery-progress">
                                        <div className="progress-line"></div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </>
                )}

            </div>

        </Layout>
    );
}

export default Dashboard;