import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "./Orders.css";
import Layout from "../components/Layout";

function VendorOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {

        try {

            const res = await API.get("/orders/all");
            setOrders(res.data);

        } catch (err) {

            toast.error("Failed to load orders");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {

        try {

            await API.put(`/orders/${id}/status?status=${status}`);

            toast.success("Order status updated");

            fetchOrders();

        } catch (err) {

            toast.error("Update failed");

        }
    };

    return (

        <Layout title="Vendor Orders">

            <div className="orders-container">

                 

                {/* ================= LOADING ================= */}
                {loading ? (

                    <div className="loading-orders">
                        <p>Loading vendor orders...</p>
                    </div>

                ) : orders.length === 0 ? (

                    /* ================= EMPTY ================= */
                    <div className="empty-orders">

                        <h3>No Orders Found</h3>

                        <p>
                            Customer orders will appear here once placed.
                        </p>

                    </div>

                ) : (

                    /* ================= ORDERS ================= */
                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="order-row"
                            >

                                {/* LEFT */}
                                <div className="order-left">

                                    <h3>{order.menuName}</h3>

                                    <p className="customer-email">
                                        {order.customerEmail}
                                    </p>

                                    <p className="order-date">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>

                                </div>

                                {/* CENTER */}
                                <div className="order-center">

                                    <span className="price">
                                        ₹ {order.price}
                                    </span>

                                </div>

                                {/* RIGHT */}
                                <div className="order-right">

                                    <span
                                        className={`status ${order.status.toLowerCase()}`}
                                    >
                                        {order.status}
                                    </span>

                                    <div className="action-buttons">

                                        <button
                                            className="prepare-btn"
                                            onClick={() =>
                                                updateStatus(order.id, "PREPARING")
                                            }
                                        >
                                            Preparing
                                        </button>

                                        <button
                                            className="deliver-btn"
                                            onClick={() =>
                                                updateStatus(order.id, "DELIVERED")
                                            }
                                        >
                                            Delivered
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </Layout>
    );
}

export default VendorOrders;