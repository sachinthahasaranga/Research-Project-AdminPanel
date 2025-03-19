import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectRoutes = ({ allowedRoles }) => {
    const { token, role } = useAuth();
    const storedRole = localStorage.getItem("role");

    if (!token || !storedRole) return <Navigate to="/login" />;
    if (!allowedRoles.includes(storedRole)) return <Navigate to="/404" />;

    return <Outlet />;
};

export default ProtectRoutes;
