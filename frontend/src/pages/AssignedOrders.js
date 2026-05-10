import { useEffect, useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

import Layout from "../components/Layout";

import {
    Truck,
    CheckCircle2,
    Clock3,
    User,
    Phone,
    MapPin,
    PackageCheck
} from "lucide-react";

import "./AssignedOrders.css";

function AssignedOrders() {

    // =========================================================
    // STATES
    // =========================================================

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    // =========================================================
    // FETCH DELIVERY ORDERS
    // =========================================================

    const fetchOrders = async () => {

        try {

            const res = await API.get("/orders/delivery");

            setOrders(res.data);

        } catch (err) {

            toast.error("Failed to load delivery orders");

        } finally {

            setLoading(false);

        }

    };

    // =========================================================
    // LOAD DATA
    // =========================================================

    useEffect(() => {

        fetchOrders();

    }, []);

    // =========================================================
    // UPDATE STATUS
    // =========================================================

    const updateStatus = async (id, status) => {

        try {

            await API.put(
                `/orders/${id}/delivery-status?status=${status}`
            );

            toast.success("Order updated");

            fetchOrders();

        } catch (err) {

            toast.error("Failed to update order");

        }

    };

    // =========================================================
    // COMPONENT
    // =========================================================

    return (

        <Layout title="Assigned Orders">

            <div className="delivery-container">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                {/* <div className="delivery-header">

                    <h2>
                        <Truck size={24} />

                        Assigned Orders
                    </h2>

                    <p>
                        Manage and track your assigned deliveries.
                    </p>

                </div> */}


                {/* =====================================================
                    LOADING
                ===================================================== */}

                {loading ? (

                    <div className="delivery-loading">

                        Loading delivery orders...

                    </div>

                ) : orders.length === 0 ? (

                    /* =================================================
                        EMPTY STATE
                    ================================================= */

                    <div className="delivery-empty">

                        <Truck size={60} />

                        <h3>
                            No Assigned Orders
                        </h3>

                        <p>
                            Orders assigned to you will appear here.
                        </p>

                    </div>

                ) : (

                    /* =================================================
                        ORDERS GRID
                    ================================================= */

                    <div className="delivery-grid">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="delivery-card"
                            >

                                {/* =========================================
                                    TOP
                                ========================================= */}

                                <div className="delivery-top">

                                    <div>

                                        <h3>
                                            {order.menuName}
                                        </h3>

                                        <span className="delivery-date">

                                            {new Date(
                                                order.createdAt
                                            ).toLocaleString()}

                                        </span>

                                    </div>

                                    <span
                                        className={`delivery-status ${(order.status || "").toLowerCase()}`}
                                    >

                                        {order.status}

                                    </span>

                                </div>


                                {/* =========================================
                                    ORDER INFO
                                ========================================= */}

                                <div className="delivery-info">

                                    <div className="info-row">

                                        <User size={16} />

                                        <span>
                                            {order.customerEmail}
                                        </span>

                                    </div>

                                    <div className="info-row">

                                        <PackageCheck size={16} />

                                        <span>
                                            Qty: {order.quantity}
                                        </span>

                                    </div>

                                    <div className="info-row">

                                        <Clock3 size={16} />

                                        <span>
                                            ₹ {order.totalAmount}
                                        </span>

                                    </div>

                                </div>


                                {/* =========================================
                                    ITEMS
                                ========================================= */}

                                <div className="delivery-items">

                                    {order.items?.map((item, index) => (

                                        <div
                                            key={index}
                                            className="delivery-item-row"
                                        >

                                            <div className="item-left">

                                                {item.image && (

                                                    <img
                                                        src={item.image}
                                                        alt={item.menuName}
                                                    />

                                                )}

                                                <div>

                                                    <h4>
                                                        {item.menuName}
                                                    </h4>

                                                    <p>
                                                        {item.category}
                                                    </p>

                                                </div>

                                            </div>

                                            <div className="item-right">

                                                x{item.quantity}

                                            </div>

                                        </div>

                                    ))}

                                </div>


                                {/* =========================================
                                    ACTION BUTTONS
                                ========================================= */}

                                <div className="delivery-actions">

                                    {/* OUT FOR DELIVERY */}

                                    {order.status === "PACKED" && (

                                        <button
                                            className="out-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    order.id,
                                                    "OUT_FOR_DELIVERY"
                                                )
                                            }
                                        >

                                            <Truck size={16} />

                                            Out For Delivery

                                        </button>

                                    )}

                                    {/* DELIVERED */}

                                    {order.status === "OUT_FOR_DELIVERY" && (

                                        <button
                                            className="deliver-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    order.id,
                                                    "DELIVERED"
                                                )
                                            }
                                        >

                                            <CheckCircle2 size={16} />

                                            Mark Delivered

                                        </button>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </Layout>

    );

}

export default AssignedOrders;