import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

import {
    Search,
    ArrowUpDown,
    Pencil,
    Trash2,
    UserPlus
} from "lucide-react";

import "./ManageUsers.css";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("name");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        roles: ["CUSTOMER"]
    });

    const [editingId, setEditingId] = useState(null);

    // ================= FETCH USERS =================
    const fetchUsers = async () => {

        try {

            const res = await API.get("/users");

            setUsers(res.data);

        } catch (err) {

            toast.error("Failed to load users");

        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ================= FILTER + SORT =================
    const filteredUsers = useMemo(() => {

        let data = [...users];

        // SEARCH
        data = data.filter((user) =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.roles?.[0]?.toLowerCase().includes(search.toLowerCase())
        );

        // SORT
        data.sort((a, b) => {

            if (sortBy === "name") {
                return (a.name || "").localeCompare(b.name || "");
            }

            if (sortBy === "email") {
                return a.email.localeCompare(b.email);
            }

            if (sortBy === "role") {
                return (a.roles?.[0] || "")
                    .localeCompare(b.roles?.[0] || "");
            }

            return 0;
        });

        return data;

    }, [users, search, sortBy]);

    // ================= HANDLE FORM =================
    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "roles"
                    ? [value]
                    : value
        });
    };

    // ================= SAVE =================
    const handleSubmit = async () => {

        try {

            if (!form.name.trim()) {
                return toast.error("Name is required");
            }

            if (!form.email.trim()) {
                return toast.error("Email is required");
            }

            if (!editingId && !form.password.trim()) {
                return toast.error("Password is required");
            }

            // ================= CHECK DUPLICATE EMAIL + ROLE =================

            const existingUser = users.find((u) => {

                // Ignore current editing user
                if (editingId && u.id === editingId) {
                    return false;
                }

                return (
                    u.email?.toLowerCase() === form.email.toLowerCase()
                    &&
                    u.roles?.[0] === form.roles[0]
                );
            });

            if (existingUser) {

                return toast.error(
                    `${form.email} already exists as ${form.roles[0]}`
                );
            }

            // ================= SAVE USER =================

            if (editingId) {

                await API.put(`/users/${editingId}`, form);

                toast.success("User updated");

            } else {

                await API.post("/users/register", form);

                toast.success("User added");
            }

            setForm({
                name: "",
                email: "",
                password: "",
                roles: ["CUSTOMER"]
            });

            setEditingId(null);

            fetchUsers();

        } catch (err) {

            toast.error("Operation failed");

        }
    };

    // ================= EDIT =================
    const handleEdit = (user) => {

        setEditingId(user.id);

        setForm({
            name: user.name || "",
            email: user.email || "",
            password: "",
            roles: user.roles
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // ================= DELETE =================
    const handleDelete = async (id) => {

        if (!window.confirm("Delete this user?")) {
            return;
        }

        try {

            await API.delete(`/users/${id}`);

            toast.success("User deleted");

            fetchUsers();

        } catch (err) {

            toast.error("Delete failed");

        }
    };

    return (

        <Layout title="Manage Users">

            <div className="manage-users-container">

                {/* ================= TOP BAR ================= */}
                <div className="top-controls">

                    {/* SEARCH */}
                    <div className="search-box">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    {/* SORT */}
                    <div className="sort-box">

                        <ArrowUpDown size={16} />

                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value)
                            }
                        >

                            <option value="name">
                                Sort by Name
                            </option>

                            <option value="email">
                                Sort by Email
                            </option>

                            <option value="role">
                                Sort by Role
                            </option>

                        </select>

                    </div>

                </div>

                {/* ================= FORM ================= */}
                <div className="user-form-card">

                    <h2>
                        <UserPlus size={20} />
                        {editingId
                            ? " Update User"
                            : " Add New User"}
                    </h2>

                    <div className="form-grid">

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder={
                                editingId
                                    ? "Leave blank to keep same password"
                                    : "Enter password"
                            }
                            value={form.password}
                            onChange={handleChange}
                        />

                        <select
                            name="roles"
                            value={form.roles[0]}
                            onChange={handleChange}
                        >

                            <option value="CUSTOMER">
                                CUSTOMER
                            </option>

                            <option value="VENDOR">
                                VENDOR
                            </option>

                            <option value="DELIVERY">
                                DELIVERY
                            </option>

                            <option value="ADMIN">
                                ADMIN
                            </option>

                        </select>

                    </div>

                    <button
                        className="save-btn"
                        onClick={handleSubmit}
                    >
                        {editingId
                            ? "Update User"
                            : "Add User"}
                    </button>

                </div>

                {/* ================= TABLE ================= */}
                <div className="users-table-wrapper">

                    <table className="users-table">

                        <thead>

                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredUsers.map((user) => (

                                <tr key={user.id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>

                                        <span className="role-badge">
                                            {user.roles?.[0]}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEdit(user)
                                                }
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>
    );
}

export default ManageUsers;