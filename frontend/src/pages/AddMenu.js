import { useEffect, useState } from "react";
import {
    Search,
    UtensilsCrossed,
    Pencil,
    Trash2,
    IndianRupee,
    Tags,
    FileText,
    PlusCircle
} from "lucide-react";

import API from "../services/api";
import "./AddMenu.css";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

function AddMenu() {

    const [menus, setMenus] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {

        try {

            const res = await API.get("/menu");
            setMenus(res.data);

        } catch (err) {

            toast.error("Failed to load menu");

        }
    };

    const clearForm = () => {

        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setEditId(null);
    };

    const handleSubmit = async () => {

        if (!name || !description || !price || !category) {
            return toast.error("All fields are required");
        }

        try {

            const payload = {
                name,
                description,
                price,
                category,
                available: true
            };

            if (editId) {

                await API.put(`/menu/${editId}`, payload);

                toast.success("Menu updated");

            } else {

                await API.post("/menu", payload);

                toast.success("Menu added");
            }

            clearForm();
            fetchMenus();

        } catch {

            toast.error("Operation failed");

        }
    };

    const handleEdit = (item) => {

        setEditId(item.id);
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setCategory(item.category);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this menu item?")) {
            return;
        }

        try {

            await API.delete(`/menu/${id}`);

            toast.success("Menu deleted");

            fetchMenus();

        } catch {

            toast.error("Delete failed");

        }
    };

    const filteredMenus = menus.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <Layout title="Manage Menu">

            <div className="manage-menu-container">

                {/* Top Controls */}
                <div className="top-controls">

                    <div className="search-box">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search menu..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                </div>

                {/* Form Card */}
                <div className="menu-form-card">

                    <h2>
                        <UtensilsCrossed size={22} />
                        {editId ? " Update Menu" : " Add Menu"}
                    </h2>

                    <div className="form-grid">

                        <div className="input-icon-box">

                            <UtensilsCrossed size={18} />

                            <input
                                type="text"
                                placeholder="Menu Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>

                        <div className="input-icon-box">

                            <IndianRupee size={18} />

                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                        </div>

                        <div className="input-icon-box">

                            <Tags size={18} />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Drinks">Drinks</option>
                            </select>

                        </div>

                    </div>

                    <div className="textarea-box">

                        <FileText size={18} />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                    </div>

                    <button
                        className="save-btn"
                        onClick={handleSubmit}
                    >
                        <PlusCircle size={18} />

                        {editId ? " Update Menu" : " Add Menu"}
                    </button>

                </div>

                {/* Table */}
                <div className="menu-table-wrapper">

                    <table className="menu-table">

                        <thead>

                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredMenus.length > 0 ? (

                                filteredMenus.map((item) => (

                                    <tr key={item.id}>

                                        <td>
                                            <div className="menu-info">
                                                <strong>{item.name}</strong>
                                                <span>{item.description}</span>
                                            </div>
                                        </td>

                                        <td>
                                            <span className="category-badge">
                                                {item.category}
                                            </span>
                                        </td>

                                        <td>₹{item.price}</td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="4" className="empty-cell">
                                        No menu items found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>
    );
}

export default AddMenu;