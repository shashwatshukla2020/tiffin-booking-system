import { useState } from "react";
import API from "../services/api";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("CUSTOMER");

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await API.post("/users/register", {
                name,
                email,
                password,
                roles: [role]
            });

            toast.success("Registered successfully");
            navigate("/"); // redirect to login

        } catch (err) {
            toast.error("Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select onChange={(e) => setRole(e.target.value)}>
                 
                    <option value="CUSTOMER">Customer</option>
                    <option value="VENDOR">Vendor</option>
                    <option value="DELIVERY">Delivery</option>
                </select>

                <button onClick={handleRegister}>Register</button>

                <p>
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;