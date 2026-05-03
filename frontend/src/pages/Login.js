import { useState } from "react";
import API from "../services/api";
import "./Auth.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

   

const handleLogin = async () => {

    // ✅ Validation
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
        const res = await API.post("/auth/login", { email, password });

        localStorage.setItem("token", res.data.token);
        toast.success("Login successful");

        navigate("/dashboard");

    } catch (err) {
        toast.error("Invalid credentials");
    }
};

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>Login</button>

                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;