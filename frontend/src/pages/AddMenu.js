import { useEffect, useState } from "react";

import {
    Search,
    UtensilsCrossed,
    Pencil,
    Trash2,
    IndianRupee,
    Tags,
    FileText,
    PlusCircle,
    Image as ImageIcon,
    PackageCheck
} from "lucide-react";

import API from "../services/api";
import "./AddMenu.css";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

function AddMenu() {

    // ================= STATES =================

    const [menus, setMenus] = useState([]);

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [price, setPrice] = useState("");

    const [category, setCategory] = useState("");

    const [veg, setVeg] = useState(true);

    const [imageUrl, setImageUrl] = useState("");

    const [available, setAvailable] = useState(true);

    const [search, setSearch] = useState("");

    const [editId, setEditId] = useState(null);

    const [categories, setCategories] = useState([]);
    // ================= FETCH MENUS =================

    useEffect(() => {
        fetchMenus();
        fetchCategories();
    }, []);

    const fetchMenus = async () => {

        try {

            const res = await API.get("/menu");

            setMenus(res.data);

        } catch (err) {

            toast.error("Failed to load menu");

        }
    };

    const fetchCategories = async () => {

        try {

            const res = await API.get("/categories");

            setCategories(res.data);

        } catch {

            toast.error("Failed to load categories");
        }
    };
    // ================= CLEAR FORM =================

    const clearForm = () => {

        setName("");

        setDescription("");

        setPrice("");

        setCategory("");

        setVeg(true);

        setImageUrl("");

        setAvailable(true);

        setEditId(null);
    };

    // ================= SUBMIT =================

    const handleSubmit = async () => {

        if (
            !name ||
            !description ||
            !price ||
            !category
        ) {
            return toast.error("All fields are required");
        }

        try {

            const payload = {

                name,

                description,

                price,

                category,

                veg,

                imageUrl,

                available
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

    // ================= EDIT =================

    const handleEdit = (item) => {

        setEditId(item.id);

        setName(item.name);

        setDescription(item.description);

        setPrice(item.price);

        setCategory(item.category);

        setVeg(item.veg);

        setImageUrl(item.imageUrl || "");

        setAvailable(item.available);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // ================= DELETE =================

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

    // ================= SEARCH =================

    const filteredMenus = menus.filter((item) =>
        item.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <Layout title="Manage Menu">

            <div className="manage-menu-container">

                {/* ================= TOP CONTROLS ================= */}

                <div className="top-controls">

                    <div className="search-box">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search menu..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>

                {/* ================= FORM ================= */}

                <div className="menu-form-card">

                    <h2>

                        <UtensilsCrossed size={22} />

                        {editId
                            ? " Update Menu"
                            : " Add Menu"}

                    </h2>

                    <div className="form-grid">

                        {/* NAME */}

                        <div className="input-icon-box">

                            <UtensilsCrossed size={18} />

                            <input
                                type="text"
                                placeholder="Menu Name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />

                        </div>

                        {/* PRICE */}

                        <div className="input-icon-box">

                            <IndianRupee size={18} />

                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value)
                                }
                            />

                        </div>

                        {/* CATEGORY */}

                        <div className="input-icon-box">

                            <Tags size={18} />

                             <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                            >

                                <option value="">
                                    Select Category
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

                        {/* VEG / NON VEG */}

                        <div className="input-icon-box">

                            <UtensilsCrossed size={18} />

                            <select
                                value={veg}
                                onChange={(e) =>
                                    setVeg(
                                        e.target.value === "true"
                                    )
                                }
                            >

                                <option value="true">
                                    🟢 Veg
                                </option>

                                <option value="false">
                                    🔴 Non-Veg
                                </option>

                            </select>

                        </div>

                        {/* AVAILABILITY */}

                        <div className="input-icon-box">

                            <PackageCheck size={18} />

                            <select
                                value={available}
                                onChange={(e) =>
                                    setAvailable(
                                        e.target.value === "true"
                                    )
                                }
                            >

                                <option value="true">
                                    Available
                                </option>

                                <option value="false">
                                    Out Of Stock
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* IMAGE URL */}

                    <div className="input-icon-box full-width">

                        <ImageIcon size={18} />

                        <input
                            type="text"
                            placeholder="Enter Image URL"
                            value={imageUrl}
                            onChange={(e) =>
                                setImageUrl(e.target.value)
                            }
                        />

                    </div>

                    {/* DESCRIPTION */}

                    <div className="textarea-box">

                        <FileText size={18} />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>

                    {/* BUTTON */}

                    <button
                        className="save-btn"
                        onClick={handleSubmit}
                    >

                        <PlusCircle size={18} />

                        {editId
                            ? " Update Menu"
                            : " Add Menu"}

                    </button>

                </div>

                {/* ================= TABLE ================= */}

                <div className="menu-table-wrapper">

                    <table className="menu-table">

                        <thead>

                            <tr>

                                <th>Image</th>

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

                                        {/* IMAGE */}

                                        <td>

                                            <img
                                                src={
                                                    item.imageUrl ||
                                                    "https://via.placeholder.com/60"
                                                }
                                                alt={item.name}
                                                className="menu-img"
                                            />

                                        </td>

                                        {/* NAME */}

                                        <td>

                                            <div className="menu-info">

                                                <strong>
                                                    {item.name}
                                                </strong>

                                                <span>
                                                    {item.description}
                                                </span>

                                            </div>

                                        </td>

                                        {/* CATEGORY + BADGES */}

                                        <td>

                                            <div className="menu-badges">

                                                <span className="category-badge">
                                                    {item.category}
                                                </span>

                                                <span
                                                    className={
                                                        item.veg
                                                            ? "veg-badge"
                                                            : "nonveg-badge"
                                                    }
                                                >

                                                    {item.veg
                                                        ? "🟢 Veg"
                                                        : "🔴 Non-Veg"}

                                                </span>

                                                <span
                                                    className={
                                                        item.available
                                                            ? "available-badge"
                                                            : "stock-badge"
                                                    }
                                                >

                                                    {item.available
                                                        ? "Available"
                                                        : "Out Of Stock"}

                                                </span>

                                            </div>

                                        </td>

                                        {/* PRICE */}

                                        <td>

                                            ₹{item.price}

                                        </td>

                                        {/* ACTIONS */}

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >

                                                    <Pencil size={16} />

                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                >

                                                    <Trash2 size={16} />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="empty-cell"
                                    >

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