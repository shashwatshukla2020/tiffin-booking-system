import { useState } from "react";
import API from "../services/api";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    User,
    Mail,
    Lock,
    Shield,
    UserPlus
} from "lucide-react";

function Register() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [role, setRole] = useState("CUSTOMER");

    const navigate = useNavigate();

    const handleRegister = async () => {

        if (!name.trim()) {
            return toast.error("Name is required");
        }

        if (!email.trim()) {
            return toast.error("Email is required");
        }

        if (!email.includes("@")) {
            return toast.error("Enter valid email");
        }

        if (!password.trim()) {
            return toast.error("Password is required");
        }

        if (password.length < 4) {
            return toast.error("Password too short");
        }

        try {

            await API.post("/users/register", {
                name,
                email,
                password,
                roles: [role]
            });

            toast.success("Registered successfully");

            navigate("/");

        } catch (err) {

            toast.error("Registration failed");
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-top">

                    <h2>Create Account ✨</h2>

                    <p>
                        Join the homemade tiffin platform
                    </p>

                </div>

                {/* NAME */}
                <div className="input-group">

                    <User size={18} className="input-icon" />

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                </div>

                {/* EMAIL */}
                <div className="input-group">

                    <Mail size={18} className="input-icon" />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                {/* PASSWORD */}
                <div className="input-group">

                    <Lock size={18} className="input-icon" />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>

                {/* ROLE */}
                <div className="input-group">

                    <Shield size={18} className="input-icon" />

                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(e.target.value)
                        }
                    >

                        <option value="ADMIN">
                            Admin
                        </option>

                        <option value="CUSTOMER">
                            Customer
                        </option>

                        <option value="VENDOR">
                            Vendor
                        </option>

                        <option value="DELIVERY">
                            Delivery
                        </option>

                    </select>

                </div>

                {/* BUTTON */}
                <button
                    className="auth-btn"
                    onClick={handleRegister}
                >
                    <UserPlus size={18} />
                    Register
                </button>

                <p className="auth-switch">

                    Already have an account?

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;