import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('/api/auth/me', { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(() => setUser(null));
    }, []);


    const login = async (credentials) => {
        
        const res = await axios.post('http://localhost:5000/api/users/login', {

            username: credentials.username,
            password: credentials.password,

            },  { withCredentials: true });
            
         setUser({ role: res.data.role });
        localStorage.setItem("role", res.data.role)

        console.log("User role: ",user.role)
    };

    const register = async (credentials) => {
        const res = await axios.post('http://localhost:5000/api/users/register', {
            username: credentials.username,
            password: credentials.password,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            companyName: credentials.company
            
            
        }, {withCredentials: true});

        console.log("status" ,res.status)
        return res.status;
        
    }

    const logout = async () => {
        console.log("Calling logout")
        await axios.post('http://localhost:5000/api/users/logout', { withCredentials: true });
        setUser(null);
        localStorage.removeItem("role")
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);