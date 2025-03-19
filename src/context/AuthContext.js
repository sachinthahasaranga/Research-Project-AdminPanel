import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null);


    const login = async (credentials) => {
        try {
            // Step 1: Authenticate user
            const res = await axios.post('http://localhost:5001/api/auth/login', {
                email: credentials.email,
                password: credentials.password
            });
    
            const { token, user } = res.data;
            console.log("Login API Response:", res.data); // 🛑 DEBUG: Check login response
    
            setToken(token);
            setUser(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
            if (!user.role) {
                console.error("🚨 No roleId found in login response!");
                return null;
            }
    
            // Step 2: Fetch user role
            const roleRes = await axios.get(`http://localhost:5001/api/user-roles/${user.role}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("Role API Response:", roleRes.data); 
            const roleName = roleRes.data.name;
            console.log("User role:", roleName);
    
            setRole(roleName);
            localStorage.setItem("role", roleName);
    
            return roleName; // Return role name for redirection
    
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
