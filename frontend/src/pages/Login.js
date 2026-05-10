import { useState } from "react";
import API from "../services/api";
import "./Auth.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    Mail,
    Lock,
    LogIn
} from "lucide-react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        if (!email.trim()) {
            return toast.error("Email is required");
        }

        if (!password.trim()) {
            return toast.error("Password is required");
        }

        if (password.length < 4) {
            return toast.error("Password must be at least 4 characters");
        }

        try {

            const res = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("roles", JSON.stringify(res.data.roles));

            toast.success("Login successful");

            navigate("/dashboard");

        } catch (err) {

            toast.error("Invalid credentials");
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-top">

                    <h2>Welcome Back 👋</h2>

                    <p>
                        Login to continue your tiffin journey
                    </p>

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

                {/* BUTTON */}
                <button
                    className="auth-btn"
                    onClick={handleLogin}
                >
                    <LogIn size={18} />
                    Login
                </button>

                <p className="auth-switch">

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;