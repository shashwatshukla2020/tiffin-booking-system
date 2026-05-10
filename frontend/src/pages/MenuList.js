import { useEffect, useMemo, useState } from "react";

import API from "../services/api";
import { toast } from "react-toastify";

import Layout from "../components/Layout";

import {
    Search,
    ShoppingCart,
    Filter,
    IndianRupee,
    Plus,
    Minus,
    Star,
    Flame,
    Tags,
    UtensilsCrossed
} from "lucide-react";

import "./Menu.css";

function MenuList() {

    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    // ================= FILTERS =================
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");

    // ================= CART =================
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

    // ================= FETCH CATEGORIES =================
    const fetchCategories = async () => {

        try {

            const res = await API.get("/categories");

            setCategories(res.data);

        } catch (err) {

            console.log(err);

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
        fetchCategories();
        fetchCart();

    }, []);

    // ================= FILTERED MENUS =================
    const filteredMenus = useMemo(() => {

        let data = [...menus];

        // SEARCH
        data = data.filter((item) =>
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase()) ||
            item.category?.toLowerCase().includes(search.toLowerCase())
        );

        // CATEGORY FILTER
        if (selectedCategory !== "ALL") {

            data = data.filter(
                (item) => item.category === selectedCategory
            );
        }

        return data;

    }, [menus, search, selectedCategory]);

    // ================= ADD TO CART =================
    const handleAddToCart = async (item) => {

        try {

            const existingItem = cartItems[item.id];

            if (existingItem) {

                const updatedQty =
                    existingItem.quantity + 1;

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

                const res = await API.post("/cart", {
                    menuId: item.id,
                    menuName: item.name,
                    category: item.category,
                    imageUrl: item.imageUrl,
                    price: item.price,
                    quantity: 1
                });

                setCartItems({
                    ...cartItems,
                    [item.id]: res.data
                });
            }

        } catch (err) {

            toast.error("Failed to update cart");

        }
    };

    // ================= REMOVE =================
    const handleDecrease = async (item) => {

        try {

            const existingItem = cartItems[item.id];

            if (!existingItem) return;

            if (existingItem.quantity === 1) {

                await API.delete(`/cart/${existingItem.id}`);

                const updatedCart = { ...cartItems };

                delete updatedCart[item.id];

                setCartItems(updatedCart);

            } else {

                const updatedQty =
                    existingItem.quantity - 1;

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

                {/* ================= HERO ================= */}

                <div className="menu-hero">

                    <div>

                        <h1>
                            Fresh Homemade Meals 🍱
                        </h1>

                        <p>
                            Explore delicious tiffins prepared
                            by trusted vendors with fresh ingredients.
                        </p>

                    </div>

                    <div className="menu-stats">

                        <div className="stat-card">

                            <Flame size={20} />

                            <div>

                                <h3>{menus.length}</h3>

                                <span>Total Meals</span>

                            </div>

                        </div>

                        <div className="stat-card">

                            <ShoppingCart size={20} />

                            <div>

                                <h3>
                                    {
                                        Object.values(cartItems)
                                            .reduce(
                                                (a, b) =>
                                                    a + b.quantity,
                                                0
                                            )
                                    }
                                </h3>

                                <span>Cart Items</span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= FILTERS ================= */}

                <div className="menu-controls">

                    {/* SEARCH */}

                    <div className="search-box">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search meals..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    {/* CATEGORY */}

                    <div className="category-filter">

                        <Filter size={18} />

                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(
                                    e.target.value
                                )
                            }
                        >

                            <option value="ALL">
                                All Categories
                            </option>

                            {categories.map((cat) => (

                                <option
                                    key={cat.id}
                                    value={cat.name}
                                >
                                    {cat.name}
                                </option>

                            ))}

                        </select>

                    </div>

                </div>

                {/* ================= LOADING ================= */}

                {loading ? (

                    <div className="loading-section">

                        <p>
                            Loading delicious meals...
                        </p>

                    </div>

                ) : filteredMenus.length === 0 ? (

                    <div className="empty-menu">

                        <h3>No Menus Found</h3>

                        <p>
                            Try another search or category.
                        </p>

                    </div>

                ) : (

                    <div className="menu-grid">

                        {filteredMenus.map((item) => (

                            <div
                                key={item.id}
                                className="menu-card"
                            >

                                {/* IMAGE */}

                                <div className="menu-image-wrapper">

                                    {/* ================= IMAGE ================= */}

                                            {/* IMAGE */}

                                        {item.imageUrl ? (

                                            <div className="menu-image-wrapper">

                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="menu-image"
                                                />

                                            </div>

                                        ) : (

                                            <div className="menu-placeholder">

                                                <UtensilsCrossed size={42} />

                                            </div>

                                        )}

                                    <div className="menu-badge">

                                        <Star size={12} />

                                        Fresh

                                    </div>

                                </div>

                                {/* CONTENT */}

                                <div className="menu-content">

                                    {/* TITLE */}

                                    <div className="menu-top-row">

                                        <h3 className="menu-title">
                                            {item.name}
                                        </h3>

                                        <div className="category-chip">

                                            <Tags size={12} />

                                            {item.category}

                                        </div>

                                    </div>

                                    {/* DESC */}

                                    <p className="menu-description">
                                        {item.description}
                                    </p>

                                    {/* PRICE */}

                                    <div className="menu-bottom">

                                        <div className="price-box">

                                            <IndianRupee size={16} />

                                            <span>
                                                {item.price}
                                            </span>

                                        </div>

                                        <div className="availability available">

                                            Available

                                        </div>

                                    </div>

                                    {/* CART */}

                                    {cartItems[item.id] ? (

                                        <div className="qty-box">

                                            <button
                                                className="qty-btn"
                                                onClick={() =>
                                                    handleDecrease(item)
                                                }
                                            >

                                                <Minus size={16} />

                                            </button>

                                            <span className="qty-count">

                                                {
                                                    cartItems[item.id]
                                                        .quantity
                                                }

                                            </span>

                                            <button
                                                className="qty-btn"
                                                onClick={() =>
                                                    handleAddToCart(item)
                                                }
                                            >

                                                <Plus size={16} />

                                            </button>

                                        </div>

                                    ) : (

                                        <button
                                            className="add-cart-btn"
                                            onClick={() =>
                                                handleAddToCart(item)
                                            }
                                        >

                                            <ShoppingCart size={16} />

                                            Add To Cart

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

export default MenuList;