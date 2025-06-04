import React from "react"
import { useState } from "react"
import { useAuth } from "../../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import type { UserLogin } from "../../models/User";


export const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const success = await login(form as UserLogin);
        if (success) {
            navigate('/dashboard');
        } else {
            // Puedes mostrar un mensaje de error si lo necesitas
            setMessage('Error loging in');
        }
    };

    return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-70">
        <h2 className="text-bold text-center text-3xl mb-2 md:text-4xl">Login</h2>

        <form onSubmit={handleSubmit} className="p-5 m-4 flex flex-col gap-2 bg-black rounded-lg max-w-[400px] min-w-[300px]">
            <input
            className="p-1 rounded-sm focus-within:bg-neutral-800"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            />
            <input
            className="p-1 rounded-sm focus-within:bg-neutral-800"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            />

            <button
            type="submit"
            className="p-1 hover:bg-blue-800 transition-all ease-in-out duration-300 bg-blue-700 disabled:bg-gray-400 rounded-sm"
            >
            Enter
            </button>

            {message && <p className="text-red-500 text-sm">{message}</p>}

            <p className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-400 hover:underline">
                Sign up
            </Link>
            </p>
        </form>
        </div>
    );
}