import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectRoutes = ({ allowedRoles }) => {
    const { token, role } = useAuth();
    const storedRole = localStorage.getItem("role");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    // Check for token and role existence
    if (!token || !storedRole) return <Navigate to="/login" replace />;

    console.log('excuted here 1');
    const now = Date.now();
    if (!tokenExpiry || now > parseInt(tokenExpiry, 10)) {
        // Session expired: clear storage and redirect to login
        console.log('excuted here 2');
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("tokenExpiry");
        return <Navigate to="/login" replace />;
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(storedRole)) return <Navigate to="/404" replace />;

    return <Outlet />;
};

export default ProtectRoutes;
