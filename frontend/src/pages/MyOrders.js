import { useEffect, useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

import Layout from "../components/Layout";

import {
    ShoppingBag,
    CalendarDays,
    IndianRupee,
    PackageCheck
} from "lucide-react";

import "./Orders.css";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    // ================= FETCH ORDERS =================

    const fetchOrders = async () => {

        try {

            const res = await API.get("/orders/my");

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

    return (

        <Layout title="My Orders">

            <div className="orders-container">

                {/* ================= HEADER ================= */}

                {/* <div className="orders-header">

                    <h1>
                        <ShoppingBag size={28} />
                        My Orders
                    </h1>

                    <p className="orders-subtitle">
                        Track all your delicious meals and
                        order history here.
                    </p>

                </div> */}

                {/* ================= LOADING ================= */}

                {loading ? (

                    <div className="loading-orders">

                        Loading your orders...

                    </div>

                ) : orders.length === 0 ? (

                    <div className="empty-orders">

                        <h3>No Orders Found</h3>

                        <p>
                            You haven't placed any order yet.
                        </p>

                    </div>

                ) : (

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="order-card"
                            >

                                {/* ================= TOP ================= */}

                                <div className="order-top">

                                    <div>

                                        <h2>
                                            Order #{order.id.slice(-5)}
                                        </h2>

                                        <p className="order-date">

                                            <CalendarDays size={14} />

                                            {new Date(
                                                order.createdAt
                                            ).toLocaleString()}

                                        </p>

                                    </div>

                                    <span
                                        className={`status ${(order.status || "").toLowerCase()}`}
                                    >
                                        {order.status}
                                    </span>

                                </div>

                                {/* ================= ITEMS ================= */}

                                <div className="order-items">

                                    {order.items?.map((item, index) => (

                                        <div
                                            key={index}
                                            className="order-item"
                                        >

                                            {/* IMAGE */}

                                            <img
                                                src={
                                                    item.imageUrl ||
                                                    "https://placehold.co/100x100?text=Food"
                                                }
                                                alt={item.menuName}
                                            />

                                            {/* DETAILS */}

                                            <div className="item-details">

                                                <h3>
                                                    {item.menuName}
                                                </h3>

                                                <p>
                                                    {item.category}
                                                </p>

                                                <span>
                                                    Qty: {item.quantity}
                                                </span>

                                            </div>

                                            {/* PRICE */}

                                            <div className="item-price">

                                                ₹ {item.total}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* ================= BOTTOM ================= */}

                                <div className="order-bottom">

                                    <div className="total-section">

                                        <IndianRupee size={18} />

                                        <span>
                                            Total:
                                        </span>

                                        <strong>
                                            ₹ {order.totalAmount}
                                        </strong>

                                    </div>

                                    <div className="items-count">

                                        <PackageCheck size={18} />

                                        {order.items?.length} Items

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

export default MyOrders;