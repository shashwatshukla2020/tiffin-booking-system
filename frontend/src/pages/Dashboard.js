import "./Dashboard.css";
import { getUser } from "../services/auth";

function Dashboard() {

    const user = getUser();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="dashboard">

            {/* ================= SIDEBAR ================= */}
            <div className="sidebar">
                <h2>Tiffin</h2>

                <p>Dashboard</p>

                {/* ADMIN */}
                {user?.roles?.includes("ADMIN") && (
                    <>
                        <p>Manage Users</p>
                        <p>All Orders</p>
                        <p>Reports</p>
                    </>
                )}

                {/* VENDOR */}
                {user?.roles?.includes("VENDOR") && (
                    <>
                        <p>Add Menu</p>
                        <p>My Menus</p>
                        <p>Vendor Orders</p>
                    </>
                )}

                {/* CUSTOMER */}
                {user?.roles?.includes("CUSTOMER") && (
                    <>
                        <p>View Menu</p>
                        <p>My Orders</p>
                    </>
                )}

                {/* DELIVERY */}
                {user?.roles?.includes("DELIVERY") && (
                    <>
                        <p>Assigned Orders</p>
                        <p>Delivery Status</p>
                    </>
                )}

                <p onClick={handleLogout} style={{ marginTop: "20px", color: "#f56565" }}>
                    Logout
                </p>
            </div>

            {/* ================= MAIN ================= */}
            <div className="main">

                {/* NAVBAR */}
                <div className="navbar">
                    <h3>Dashboard</h3>
                    <div>
                        {user?.sub} ({user?.roles?.[0]})
                    </div>
                </div>

                {/* CARDS */}
                <div className="cards">

                    {/* ADMIN */}
                    {user?.roles?.includes("ADMIN") && (
                        <>
                            <div className="card">
                                <h3>Total Users</h3>
                                <p>120</p>
                            </div>

                            <div className="card">
                                <h3>Total Orders</h3>
                                <p>340</p>
                            </div>

                            <div className="card">
                                <h3>Revenue</h3>
                                <p>₹50,000</p>
                            </div>
                        </>
                    )}

                    {/* VENDOR */}
                    {user?.roles?.includes("VENDOR") && (
                        <>
                            <div className="card">
                                <h3>My Menus</h3>
                                <p>5</p>
                            </div>

                            <div className="card">
                                <h3>Orders Received</h3>
                                <p>18</p>
                            </div>

                            <div className="card">
                                <h3>Earnings</h3>
                                <p>₹12,000</p>
                            </div>
                        </>
                    )}

                    {/* CUSTOMER */}
                    {user?.roles?.includes("CUSTOMER") && (
                        <>
                            <div className="card">
                                <h3>Available Tiffins</h3>
                                <p>25</p>
                            </div>

                            <div className="card">
                                <h3>My Orders</h3>
                                <p>3</p>
                            </div>

                            <div className="card">
                                <h3>Spent</h3>
                                <p>₹1,200</p>
                            </div>
                        </>
                    )}

                    {/* DELIVERY */}
                    {user?.roles?.includes("DELIVERY") && (
                        <>
                            <div className="card">
                                <h3>Assigned Deliveries</h3>
                                <p>6</p>
                            </div>

                            <div className="card">
                                <h3>Completed</h3>
                                <p>20</p>
                            </div>

                            <div className="card">
                                <h3>Pending</h3>
                                <p>2</p>
                            </div>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Dashboard;