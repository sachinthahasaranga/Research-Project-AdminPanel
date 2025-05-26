import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import apiClient, { setAuthToken } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null);


    const login = async (credentials) => {
        try {
            // Step 1: Authenticate user
            const res = await apiClient.post('/api/auth/login', {
                email: credentials.email,
                password: credentials.password
            });
    
            const { token, user } = res.data;
            console.log("Login API Response:", res.data); 
            // setToken(token);
            // setUser(user);
            // localStorage.setItem("token", token);
            // localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            // const expiry = Date.now() + 2 * 60 * 60 * 1000; // 2 hours in ms
            // localStorage.setItem("tokenExpiry", expiry);
    
            if (!user.role) {
                console.error("🚨 No roleId found in login response!");
                return null;
            }
    
            // Step 2: Fetch user role
            const roleRes = await apiClient.get(`/api/user-roles/${user.role}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("Role API Response:", roleRes.data); 
            const roleName = roleRes.data.name;

            console.log("User role:", roleName);

            if (roleName === "Admin") {
                setToken(token);
                setUser(user);
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("role", roleName);

                // Optionally: set Authorization header and token expiry
                setAuthToken(token);
                const expiry = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
                localStorage.setItem("tokenExpiry", expiry);
                setRole(roleName);
            }
    
            // setRole(roleName);
            // localStorage.setItem("role", roleName);
            // setAuthToken(token);
    
            return roleName;
    
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            throw error;
        }
    };
    

    const logout = () => {
        setUser(null);
        setToken(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, token, role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
