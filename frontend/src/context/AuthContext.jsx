import { createContext, useContext, useState, useEffect } from "react";
import { login as loginAPI, getProfile } from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const response = await getProfile();
                    setUser(response.data);
                } catch (error) {
                    console.error('Token inválido o expirado:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await loginAPI({ username, password });

            // Guardar token en localStorage
            localStorage.setItem('token', response.data.token);


            setUser(response.data.user);

            return { ok: true };
        } catch (error) {
            return {
                ok: false,
                message: error.message || 'Credenciales incorrectas'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };


    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }

    return context;
}

export default AuthContext;