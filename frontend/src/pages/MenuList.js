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
            {menus.length === 0 ? (
    <p>No menus available</p>
) : (
    <div className="menu-grid">
        {menus.map((item) => (
            <div key={item.id} className="menu-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h4>₹ {item.price}</h4>

                <button onClick={() => handleOrder(item)}>
                    Order Now
                </button>
            </div>
        ))}
    </div>
)}
        </div>
    );
}

export default MenuList;