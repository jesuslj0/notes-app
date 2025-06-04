import { createContext, useEffect, useState } from "react"
import type { User, UserLogin, UserRegister } from "../models/User"
import { AuthService } from "../services/AuthService"

interface AuthContext {
    user: User | null
    isAuthenticated: boolean
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    register: (user: UserRegister) => void
    login: (user: UserLogin) => Promise<boolean>
    logout: () => void
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const authService = new AuthService();
    const register = async (user: UserRegister) => {
        try {
            const data = await authService.register(user);
            setUser(data);
        } catch (err) {
            console.error("Error al registrar el usuario:", err);
        }
    }

    const login = async (user: UserLogin) =>  {
        try {
            const data = await authService.login(user);
            setUser(data);
            setIsAuthenticated(true);
            return true
        } catch (err) {
            console.error("Error al iniciar sesion:", err);
            return false
        }
    }

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            console.error("Error al cerrar sesion:", err);
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            try {
                const data = await authService.getUser();
                if (data && data._id) {
                    setUser(data);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Error al obtener el usuario:", err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setUser, register, login, logout }}>
            { loading ? null : children }
        </AuthContext.Provider>
    )
}

export default AuthContext;