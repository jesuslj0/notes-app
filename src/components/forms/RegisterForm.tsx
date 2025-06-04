import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== e.currentTarget.confirmPassword.value) {
      setMessage('Passwords do not match');
      return;
    }
    register(form)
    navigate('/auth/login');
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-70">
      <h2 className="text-bold text-center text-3xl mb-2 md:text-4xl">Register</h2>
      <form onSubmit={handleSubmit} className='p-5 m-4 flex flex-col gap-2 bg-black rounded-lg max-w-[400px] min-w-[300px]'>
        <input className="p-1 rounded-sm focus-within:bg-neutral-800" type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="p-1 rounded-sm focus-within:bg-neutral-800" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="p-1 rounded-sm focus-within:bg-neutral-800" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input className="p-1 rounded-sm mb-2 focus-within:bg-neutral-800" type="password" name="confirmPassword" placeholder="Confirm Password" required />
        <button type="submit" className='p-1 hover:bg-blue-800 transition-all ease-in-out duration-300 bg-blue-700 disabled:bg-gray-400 rounded-sm'>Save</button>
        <p className='text-red-500 text-center'>{message}</p>
        <p>
          Already have an account? <Link to="/auth/login" className='text-blue-400 hover:underline'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
