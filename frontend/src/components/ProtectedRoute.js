import { Navigate } from "react-router-dom";
import { getUser } from "../services/auth";

function ProtectedRoute({ children, role }) {

    const user = getUser();

    // ❌ Not logged in
    if (!user) {
        return <Navigate to="/" />;
    }

    // ❌ Role not allowed
    if (role && !user.roles.includes(role)) {
        return <Navigate to="/dashboard" />;
    }

    // ✅ Allowed
    return children;
}

export default ProtectedRoute;