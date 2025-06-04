import type { UserRegister, UserLogin } from "../models/User";

export class AuthService {
    private ApiUrl: string = "http://localhost:4000/api/auth"
    async register(user : UserRegister) {
        try {
            const response = await fetch(`${this.ApiUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Error al registrar el usuario:", err);
        }
    }
    async login(user: UserLogin) {
        try {
            const response = await fetch(`${this.ApiUrl}/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = response.json();
            return data;
        } catch (err) {
            console.error("Error al iniciar sesion:", err);
        }
    }

    async logout() {
        try {
            const response = await fetch(`${this.ApiUrl}/logout`, {
                method: "GET",
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Error al cerrar sesion:", err);
        }
    }

    async getUser() {
        try {
            const response = await fetch(`${this.ApiUrl}/me`, {
                method: "GET",
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Error al obtener el usuario:", err);
        }
    }
}