import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check if token is expired
                if (decoded.exp * 1000 < Date.now()) {
                    logoutUser();
                } else {
                    setUser({
                        name: decoded.name,
                        email: decoded.email,
                        role: decoded.role,
                        image: decoded.image,
                    });
                }
            } catch (error) {
                console.error("Invalid token:", error);
                logoutUser();
            }
        }
    }, []);

    const loginUser = (data) => {
        localStorage.setItem('token', data.token);
        setUser({
            name: data.name,
            email: data.email,
            role: data.role,
            image: data.image,
        });
    };

    const logoutUser = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const contextData = {
        user,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};