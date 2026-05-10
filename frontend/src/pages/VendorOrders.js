import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

import {
    User,
    Clock3,
    IndianRupee,
    ChefHat,
    Truck,
    CheckCircle2,
    Bike,
    PackageCheck
} from "lucide-react";

import "./VendorOrders.css";
import Layout from "../components/Layout";

function VendorOrders() {

    const [orders, setOrders] = useState([]);
    const [deliveryBoys, setDeliveryBoys] = useState([]);
    const [loading, setLoading] = useState(true);

    // ================= FETCH ORDERS =================
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

    // ================= FETCH DELIVERY BOYS =================
    const fetchDeliveryBoys = async () => {
        try {
            const res = await API.get("/users/delivery");
            setDeliveryBoys(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchDeliveryBoys();
    }, []);

    // ================= UPDATE STATUS =================
    const updateStatus = async (id, status) => {
        try {
            await API.put(`/orders/${id}/status?status=${status}`);
            toast.success("Order updated");
            fetchOrders();
        } catch (err) {
            toast.error("Failed to update");
        }
    };

    // ================= ASSIGN DELIVERY BOY =================
    const assignDeliveryBoy = async (orderId, deliveryEmail) => {
        try {

            const selectedBoy = deliveryBoys.find(
                boy => boy.email === deliveryEmail
            );

            await API.put(
                `/orders/${orderId}/assign-delivery`,
                null,
                {
                    params: {
                        deliveryEmail,
                        deliveryName: selectedBoy?.name || ""
                    }
                }
            );

            toast.success("Delivery boy assigned");

            // 🔥 IMPORTANT: sync UI with backend
            fetchOrders();

        } catch (err) {
            toast.error("Failed to assign delivery");
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

                    <div className="empty-orders">
                        <h3>No Orders Found</h3>
                        <p>Customer orders will appear here.</p>
                    </div>

                ) : (

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="order-card-modern"
                            >

                                {/* ================= TOP ================= */}
                                <div className="vendor-order-top">

                                    <div className="vendor-user">

                                        <div className="vendor-avatar">
                                            <User size={18} />
                                        </div>

                                        <div>
                                            <h3>
                                                {order.customerName || "Customer"}
                                            </h3>
                                            <p>{order.customerEmail}</p>
                                        </div>

                                    </div>

                                    <div
                                        className={`status-badge ${(order.status || "").toLowerCase()}`}
                                    >
                                        {order.status}
                                    </div>

                                </div>

                                {/* ================= DATE ================= */}
                                <div className="vendor-date">
                                    <Clock3 size={15} />
                                    <span>
                                        {new Date(order.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                {/* ================= ITEMS ================= */}
                                <div className="vendor-items">

                                    {order.items?.map((item, index) => (

                                        <div
                                            key={index}
                                            className="vendor-item-card"
                                        >

                                            <img
                                                src={
                                                    item.imageUrl
                                                        ? item.imageUrl
                                                        : "https://placehold.co/100x100?text=Food"
                                                }
                                                alt={item.menuName}
                                                className="vendor-food-img"
                                            />

                                            <div className="vendor-food-info">

                                                <h4>{item.menuName}</h4>

                                                <p className="vendor-category">
                                                    {item.category}
                                                </p>

                                                <div className="vendor-meta">
                                                    <span>Qty: {item.quantity}</span>
                                                    <span>₹ {item.price}</span>
                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* ================= BOTTOM ROW ================= */}
                                <div className="vendor-bottom-row">

                                    {/* TOTAL */}
                                    <div className="vendor-total">
                                        <IndianRupee size={16} />
                                        <span>₹ {order.totalAmount}</span>
                                    </div>

                                    {/* DELIVERY ASSIGN */}
                                    <div className="delivery-inline-box">

                                        <Bike size={16} />

                                        <select
                                            value={order.deliveryBoyEmail ?? ""}
                                            onChange={(e) =>
                                                assignDeliveryBoy(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                            className="delivery-select"
                                        >

                                            <option value="">
                                                Assign Delivery Boy
                                            </option>

                                            {deliveryBoys.map((boy) => (
                                                <option
                                                    key={boy.id}
                                                    value={boy.email}
                                                >
                                                    {boy.name}
                                                </option>
                                            ))}

                                        </select>

                                    </div>

                                </div>

                                {/* ================= ASSIGNED INFO ================= */}
                                {order.deliveryBoyEmail && (

                                    <div className="assigned-delivery">

                                        <PackageCheck size={15} />

                                        <span>
                                            Assigned to:
                                            {" "}
                                            <strong>
                                                {order.deliveryBoyName}
                                            </strong>
                                        </span>

                                    </div>

                                )}

                                {/* ================= ACTIONS ================= */}
                                <div className="vendor-actions">

                                    <button
                                        className="prepare-btn"
                                        onClick={() =>
                                            updateStatus(order.id, "PREPARING")
                                        }
                                    >
                                        <ChefHat size={16} />
                                        Preparing
                                    </button>

                                    <button
                                        className="delivery-btn"
                                        onClick={() =>
                                            updateStatus(order.id, "OUT_FOR_DELIVERY")
                                        }
                                    >
                                        <Truck size={16} />
                                        Out For Delivery
                                    </button>

                                    <button
                                        className="complete-btn"
                                        onClick={() =>
                                            updateStatus(order.id, "DELIVERED")
                                        }
                                    >
                                        <CheckCircle2 size={16} />
                                        Delivered
                                    </button>

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