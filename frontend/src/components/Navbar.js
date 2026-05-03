import { getUser } from "../services/auth";

function Navbar() {
    const user = getUser();

    return (
        <div style={{
            padding: "10px",
            background: "#333",
            color: "white",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <span>Tiffin System</span>

            {user && (
                <span>{user.sub} ({user.roles?.[0]})</span>
            )}
        </div>
    );
}

export default Navbar;