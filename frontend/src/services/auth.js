 
import { jwtDecode } from "jwt-decode";

export const getUser = () => {

    const token = localStorage.getItem("token");

    if (!token) return null;

    const decoded = jwtDecode(token);

    return {
        ...decoded,
        name: localStorage.getItem("name"),
        roles: JSON.parse(localStorage.getItem("roles") || "[]")
    };
};