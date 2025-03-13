import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectRoutes = ({ allowedRoles}) => {
    const { user } = useAuth();
    const userRole = localStorage.getItem("role");

    // if(!user) return <Navigate to="/login" />;
    // if(!allowedRoles.includes(user.role)) return <Navigate to="/404" />

    if(!userRole) return <Navigate to="/login" />;
    if(!allowedRoles.includes(userRole)) return <Navigate to="/404" />



    return <Outlet />;

}

export default ProtectRoutes;