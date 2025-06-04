// Rutas para autenticación
import { Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

export const AuthRoutes = () => (
  <>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </>
);