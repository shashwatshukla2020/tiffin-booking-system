import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "./Orders.css";

function VendorOrders() {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await API.get("/orders/all");
            setOrders(res.data);
        } catch (err) {
            toast.error("Failed to load orders");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/orders/${id}/status?status=${status}`);
            toast.success("Status updated");
            fetchOrders();
        } catch (err) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="orders-container">
            <h2>Vendor Orders</h2>

            <div className="orders-grid">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">

                        <h3>{order.menuName}</h3>
                        <p>₹ {order.price}</p>
                        <p>{order.customerEmail}</p>

                        <p>Status: <b>{order.status}</b></p>

                        <div style={{ marginTop: "10px" }}>
                            <button onClick={() => updateStatus(order.id, "PREPARING")}>
                                Preparing
                            </button>

                            <button onClick={() => updateStatus(order.id, "DELIVERED")}>
                                Delivered
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default VendorOrders;