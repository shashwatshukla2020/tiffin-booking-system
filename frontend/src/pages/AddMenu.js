import { useState } from "react";
import API from "../services/api";
import "./Auth.css";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

function AddMenu() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        // Validation
        if (!name.trim()) {
            return toast.error("Menu name is required");
        }

        if (!description.trim()) {
            return toast.error("Description is required");
        }

        if (!price || price <= 0) {
            return toast.error("Enter valid price");
        }

        try {

            setLoading(true);

            await API.post("/menu", {
                name,
                description,
                price,
                available: true
            });

            toast.success("Menu added successfully!");

            // Clear fields
            setName("");
            setDescription("");
            setPrice("");

        } catch (err) {

            toast.error("Error adding menu");

        } finally {

            setLoading(false);

        }
    };

    return (

        <Layout title="Add Menu">

            <div className="auth-card">

                <h2>Add New Menu</h2>

                <input
                    type="text"
                    placeholder="Menu Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Menu"}
                </button>

            </div>

        </Layout>
    );
}

export default AddMenu;