import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

import Layout from "../components/Layout";

import "./Orders.css";

function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // ================= FETCH ORDERS =================

    const fetchOrders = async () => {

        try {

            const res = await API.get("/orders/my");

            // ================= REMOVE CART ITEMS =================

            const filteredOrders = res.data.filter(
                (order) => order.status !== "CART"
            );

            setOrders(filteredOrders);

        } catch (err) {

            toast.error("Failed to load orders");

        } finally {

            setLoading(false);

        }

    };

    // ================= LOAD ON PAGE OPEN =================

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <Layout title="Order History">

            <div className="orders-container fade-in">

                {/* ================= HEADER ================= */}
 

                {/* ================= LOADING ================= */}

                {loading ? (

                    <div className="loading-orders">

                        <p>Loading your orders...</p>

                    </div>

                ) : orders.length === 0 ? (

                    /* ================= EMPTY STATE ================= */

                    <div className="empty-orders">

                        <h3>🛒 No Orders Yet</h3>

                        <p>

                            You haven't placed any orders yet.
                            Explore delicious homemade meals and place your first order.

                        </p>

                    </div>

                ) : (

                    /* ================= ORDERS LIST ================= */

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="order-row"
                            >

                                {/* ================= LEFT ================= */}

                                <div className="order-left">

                                    <h3>
                                        {order.menuName}
                                    </h3>

                                    <p className="order-date">

                                        {new Date(order.createdAt).toLocaleString()}

                                    </p>

                                </div>

                                {/* ================= CENTER ================= */}

                                <div className="order-center">

                                    <span className="price">

                                        ₹ {order.price}

                                    </span>

                                </div>

                                {/* ================= RIGHT ================= */}

                                <div className="order-right">

                                    <span
                                        className={`status ${(order.status || "").toLowerCase()}`}
                                    >

                                        {order.status}

                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </Layout>

    );

}

export default MyOrders;