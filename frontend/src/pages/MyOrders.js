import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "./Orders.css";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await API.get("/orders/my");
            setOrders(res.data);
        } catch (err) {
            toast.error("Failed to load orders");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="orders-container">
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                <div className="orders-grid">
                    {orders.map((order) => (
                        <div key={order.id} className="order-card">
                            <h3>{order.menuName}</h3>
                            <p>₹ {order.price}</p>

                            <p>Status: 
                                <span className={`status ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </p>

                            <p className="date">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders;