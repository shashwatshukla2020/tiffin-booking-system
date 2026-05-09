import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import "./Cart.css";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkingOut, setCheckingOut] = useState(false);

    // ================= FETCH CART =================
    const fetchCart = async () => {

        try {

            const res = await API.get("/cart");
            setCartItems(res.data);

        } catch (err) {

            toast.error("Failed to load cart");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // ================= INCREASE =================
    const increaseQty = async (item) => {

        try {

            await API.put(`/cart/${item.id}`, {
                ...item,
                quantity: item.quantity + 1
            });

            setCartItems(prev =>
                prev.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );

        } catch (err) {

            toast.error("Failed to update quantity");

        }
    };

    // ================= DECREASE =================
    const decreaseQty = async (item) => {

        try {

            // Remove item if quantity = 1
            if (item.quantity === 1) {

                await API.delete(`/cart/${item.id}`);

                setCartItems(prev =>
                    prev.filter(cartItem => cartItem.id !== item.id)
                );

                toast.success("Item removed");

            } else {

                await API.put(`/cart/${item.id}`, {
                    ...item,
                    quantity: item.quantity - 1
                });

                setCartItems(prev =>
                    prev.map(cartItem =>
                        cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                    )
                );
            }

        } catch (err) {

            toast.error("Failed to update quantity");

        }
    };

    // ================= REMOVE =================
    const removeItem = async (id) => {

        try {

            await API.delete(`/cart/${id}`);

            setCartItems(prev =>
                prev.filter(item => item.id !== id)
            );

            toast.success("Item removed");

        } catch (err) {

            toast.error("Failed to remove item");

        }
    };

    // ================= CHECKOUT =================
    const handleCheckout = async () => {

        try {

            setCheckingOut(true);

            await API.post("/orders/checkout");

            toast.success("Order placed successfully");

            setCartItems([]);

        } catch (err) {

            toast.error("Checkout failed");

        } finally {

            setCheckingOut(false);

        }
    };

    // ================= TOTAL =================
    const totalAmount = cartItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    return (

        <Layout title="Cart">

            <div className="cart-container">

                {/* ================= HEADER ================= */}
                <div className="cart-header">

                    <div>
                        

                         
                    </div>

                    {cartItems.length > 0 && (
                        <div className="cart-count">
                            {cartItems.length} Items
                        </div>
                    )}

                </div>

                {/* ================= LOADING ================= */}
                {loading ? (

                    <div className="cart-loading">
                        Loading cart...
                    </div>

                ) : cartItems.length === 0 ? (

                    /* ================= EMPTY ================= */
                    <div className="empty-cart">

                        <div className="empty-icon">
                            🛍️
                        </div>

                        <h2>Your cart is empty</h2>

                        <p>
                            Add delicious homemade meals to continue.
                        </p>

                    </div>

                ) : (

                    /* ================= CART CONTENT ================= */
                    <div className="cart-content">

                        {/* LEFT */}
                        <div className="cart-items">

                            {cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className="cart-card"
                                >

                                    {/* INFO */}
                                    <div className="cart-info">

                                        <h3>
                                            {item.menuName}
                                        </h3>

                                        <p className="cart-price">
                                            ₹ {item.price}
                                        </p>

                                    </div>

                                    {/* ACTIONS */}
                                    <div className="cart-actions">

                                        <div className="qty-box">

                                            <button
                                                className="qty-btn"
                                                onClick={() => decreaseQty(item)}
                                            >
                                                −
                                            </button>

                                            <span className="qty-count">
                                                {item.quantity}
                                            </span>

                                            <button
                                                className="qty-btn"
                                                onClick={() => increaseQty(item)}
                                            >
                                                +
                                            </button>

                                        </div>

                                        <div className="item-total">
                                            ₹ {item.price * item.quantity}
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                        {/* RIGHT */}
                        <div className="summary-card">

                            <h2>Order Summary</h2>

                            <div className="summary-row">
                                <span>Total Items</span>
                                <span>{cartItems.length}</span>
                            </div>

                            <div className="summary-row">
                                <span>Total Amount</span>
                                <span>₹ {totalAmount}</span>
                            </div>

                            <div className="summary-row">
                                <span>Delivery</span>
                                <span className="free">
                                    FREE
                                </span>
                            </div>

                            <div className="summary-total">

                                <span>Grand Total</span>

                                <span>
                                    ₹ {totalAmount}
                                </span>

                            </div>

                            <button
                                className="checkout-btn"
                                onClick={handleCheckout}
                                disabled={checkingOut}
                            >
                                {checkingOut
                                    ? "Processing..."
                                    : "Proceed To Checkout"}
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </Layout>
    );
}

export default Cart;