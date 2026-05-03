import { useState } from "react";
import API from "../services/api";
import "./Auth.css";
import { toast } from "react-toastify";
function AddMenu() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async () => {
        try {
            await API.post("/menu", {
                name,
                description,
                price,
                available: true
            });

            toast.success("Menu added!");
        } catch (err) {
            toast.error("Error adding menu");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Add Menu</h2>

                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button onClick={handleSubmit}>Add Menu</button>
            </div>
        </div>
    );
}

export default AddMenu;