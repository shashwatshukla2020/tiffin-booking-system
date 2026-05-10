import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import API from "../services/api";

import { toast } from "react-toastify";

import {
    Search,
    PlusCircle,
    Pencil,
    Trash2,
    Tags,
    CheckCircle2,
    XCircle
} from "lucide-react";

import "./ManageCategories.css";

function ManageCategories() {

    // ================= STATES =================

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");

    const [name, setName] = useState("");

    const [active, setActive] = useState(true);

    const [editId, setEditId] = useState(null);

    // ================= FETCH =================

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {

        try {

            const res = await API.get("/categories");

            setCategories(res.data);

        } catch {

            toast.error("Failed to load categories");
        }
    };

    // ================= CLEAR =================

    const clearForm = () => {

        setName("");

        setActive(true);

        setEditId(null);
    };

    // ================= SAVE =================

    const handleSubmit = async () => {

        if (!name.trim()) {
            return toast.error("Category name is required");
        }

        // CHECK DUPLICATE
        const duplicate = categories.find(
            (cat) =>
                cat.name.toLowerCase() ===
                name.toLowerCase() &&
                cat.id !== editId
        );

        if (duplicate) {
            return toast.error(
                "Category already exists"
            );
        }

        try {

            const payload = {
                name,
                active
            };

            if (editId) {

                await API.put(
                    `/categories/${editId}`,
                    payload
                );

                toast.success("Category updated");

            } else {

                await API.post(
                    "/categories",
                    payload
                );

                toast.success("Category added");
            }

            clearForm();

            fetchCategories();

        } catch {

            toast.error("Operation failed");
        }
    };

    // ================= EDIT =================

    const handleEdit = (item) => {

        setEditId(item.id);

        setName(item.name);

        setActive(item.active);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // ================= DELETE =================

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Delete this category?"
            )
        ) {
            return;
        }

        try {

            await API.delete(
                `/categories/${id}`
            );

            toast.success("Category deleted");

            fetchCategories();

        } catch {

            toast.error("Delete failed");
        }
    };

    // ================= FILTER =================

    const filteredCategories =
        categories.filter((cat) =>
            cat.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    return (

        <Layout title="Manage Categories">

            <div className="manage-category-container">

                {/* ================= TOP CONTROLS ================= */}

                <div className="top-controls">

                    <div className="search-box">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search category..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>

                {/* ================= FORM ================= */}

                <div className="category-form-card">

                    <h2>

                        <Tags size={22} />

                        {editId
                            ? " Update Category"
                            : " Add Category"}

                    </h2>

                    <div className="form-grid">

                        {/* CATEGORY NAME */}

                        <div className="input-icon-box">

                            <Tags size={18} />

                            <input
                                type="text"
                                placeholder="Enter category name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />

                        </div>

                        {/* STATUS */}

                        <div className="input-icon-box">

                            {active
                                ? <CheckCircle2 size={18} />
                                : <XCircle size={18} />
                            }

                            <select
                                value={active}
                                onChange={(e) =>
                                    setActive(
                                        e.target.value === "true"
                                    )
                                }
                            >

                                <option value="true">
                                    Active
                                </option>

                                <option value="false">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* SAVE BUTTON */}

                    <button
                        className="save-btn"
                        onClick={handleSubmit}
                    >

                        <PlusCircle size={18} />

                        {editId
                            ? " Update Category"
                            : " Add Category"}

                    </button>

                </div>

                {/* ================= TABLE ================= */}

                <div className="category-table-wrapper">

                    <table className="category-table">

                        <thead>

                            <tr>

                                <th>Category</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredCategories.length > 0 ? (

                                filteredCategories.map((item) => (

                                    <tr key={item.id}>

                                        {/* NAME */}

                                        <td>

                                            <div className="category-info">

                                                <div className="category-avatar">

                                                    {item.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}

                                                </div>

                                                <strong>
                                                    {item.name}
                                                </strong>

                                            </div>

                                        </td>

                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={
                                                    item.active
                                                        ? "active-badge"
                                                        : "inactive-badge"
                                                }
                                            >

                                                {item.active
                                                    ? "Active"
                                                    : "Inactive"}

                                            </span>

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
                                        colSpan="3"
                                        className="empty-cell"
                                    >

                                        No categories found

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

export default ManageCategories;