import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "./Menu.css";

function MenuList() {

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchMenus();
    }, []);

    const handleOrder = async (item) => {
        try {
            await API.post("/orders", {
                menuId: item.id,
                menuName: item.name,
                price: item.price
            });

            toast.success("Order placed successfully!");
        } catch (err) {
            toast.error("Failed to place order");
        }
    };

    return (
        <div className="menu-container">

            {/* Header Section */}
            <div className="menu-header">
                <h1>🍱 Fresh Homemade Tiffins Delivered Daily</h1>

                <p className="menu-subtitle">
                    Enjoy healthy, hygienic, and delicious homemade meals
                    prepared with fresh ingredients and delivered right to your doorstep.
                </p>

                 
            </div>

            {/* Loading */}
            {loading ? (
                <div className="loading-section">
                    <p>Loading delicious meals...</p>
                </div>
            ) : menus.length === 0 ? (

                <div className="empty-menu">
                    <h3>No Menus Available</h3>
                    <p>
                        Our kitchen is preparing new dishes.
                        Please check back again shortly.
                    </p>
                </div>

            ) : (

                <>
                     

                    <div className="menu-grid">
                        {menus.map((item) => (
                            <div key={item.id} className="menu-card">

                                <div className="menu-badge">
                                    Fresh
                                </div>

                                <h3 className="menu-title">
                                    {item.name}
                                </h3>

                                <p className="menu-description">
                                    {item.description}
                                </p>

                                <div className="price-section">
                                    <h4>₹ {item.price}</h4>
                                    <span>Inclusive of all taxes</span>
                                </div>

                                <button onClick={() => handleOrder(item)}>
                                    Order Now
                                </button>

                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default MenuList;