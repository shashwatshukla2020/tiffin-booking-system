import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "./Menu.css";
import Layout from "../components/Layout";

function MenuList() {

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);

    // ================= CART STATE =================
    const [cartItems, setCartItems] = useState({});

    // ================= FETCH MENUS =================
    const fetchMenus = async () => {

        try {

            const res = await API.get("/menu");
            setMenus(res.data);

        } catch (err) {

            toast.error("Failed to load menu");

        } finally {

            setLoading(false);

        }
    };

    // ================= FETCH CART =================
    const fetchCart = async () => {

        try {

            const res = await API.get("/cart");

            const cartMap = {};

            res.data.forEach((item) => {
                cartMap[item.menuId] = item;
            });

            setCartItems(cartMap);

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        fetchMenus();
        fetchCart();

    }, []);

    // ================= ADD TO CART =================
    const handleAddToCart = async (item) => {

        try {

            const existingItem = cartItems[item.id];

            // ================= ITEM EXISTS =================

            if (existingItem) {

                const updatedQty = existingItem.quantity + 1;

                await API.put(`/cart/${existingItem.id}`, {
                    ...existingItem,
                    quantity: updatedQty
                });

                setCartItems({
                    ...cartItems,
                    [item.id]: {
                        ...existingItem,
                        quantity: updatedQty
                    }
                });

            } else {

                // ================= NEW ITEM =================

                const res = await API.post("/cart", {
                    menuId: item.id,
                    menuName: item.name,
                    price: item.price,
                    quantity: 1
                });

                setCartItems({
                    ...cartItems,
                    [item.id]: res.data
                });
            }

            toast.success("Cart updated");

        } catch (err) {

            toast.error("Failed to update cart");

        }
    };

    // ================= DECREASE QUANTITY =================
    const handleDecrease = async (item) => {

        try {

            const existingItem = cartItems[item.id];

            if (!existingItem) return;

            // ================= REMOVE ITEM =================

            if (existingItem.quantity === 1) {

                await API.delete(`/cart/${existingItem.id}`);

                const updatedCart = { ...cartItems };

                delete updatedCart[item.id];

                setCartItems(updatedCart);

            } else {

                // ================= REDUCE QUANTITY =================

                const updatedQty = existingItem.quantity - 1;

                await API.put(`/cart/${existingItem.id}`, {
                    ...existingItem,
                    quantity: updatedQty
                });

                setCartItems({
                    ...cartItems,
                    [item.id]: {
                        ...existingItem,
                        quantity: updatedQty
                    }
                });
            }

        } catch (err) {

            toast.error("Failed to update cart");

        }
    };

    return (

        <Layout title="Available Menus">

            <div className="menu-container">

                {/* ================= HEADER ================= */}
 

                {/* ================= LOADING ================= */}

                {loading ? (

                    <div className="loading-section">

                        <p>Loading delicious meals...</p>

                    </div>

                ) : menus.length === 0 ? (

                    /* ================= EMPTY ================= */

                    <div className="empty-menu">

                        <h3>No Menus Available</h3>

                        <p>
                            New dishes are being prepared.
                            Please check again shortly.
                        </p>

                    </div>

                ) : (

                    /* ================= MENU GRID ================= */

                    <div className="menu-grid">

                        {menus.map((item) => (

                            <div
                                key={item.id}
                                className="menu-card"
                            >

                                {/* Badge */}

                                <div className="menu-badge">
                                    Fresh
                                </div>

                                {/* Title */}

                                <h3 className="menu-title">
                                    {item.name}
                                </h3>

                                {/* Description */}

                                <p className="menu-description">
                                    {item.description}
                                </p>

                                {/* Price */}

                                <div className="price-section">

                                    <h4>
                                        ₹ {item.price}
                                    </h4>

                                    <span>
                                        Inclusive of all taxes
                                    </span>

                                </div>

                                {/* ================= CART BUTTONS ================= */}

                                {cartItems[item.id] ? (

                                    <div className="qty-box">

                                        <button
                                            className="qty-btn"
                                            onClick={() => handleDecrease(item)}
                                        >
                                            −
                                        </button>

                                        <span className="qty-count">
                                            {cartItems[item.id].quantity}
                                        </span>

                                        <button
                                            className="qty-btn"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            +
                                        </button>

                                    </div>

                                ) : (

                                    <button
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add To Cart
                                    </button>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </Layout>
    );
}

export default MenuList;