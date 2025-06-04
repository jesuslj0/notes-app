// components/PrivateRoute.jsx
import { Outlet, Navigate, Route } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { JSX } from "react";
import { Dashboard } from "../Dashboard";
import { NotesContextProvider } from "../context/NotesContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  // ✅ CORREGIDO: debe devolver JSX, no un objeto
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

const PrivateLayout = () => (
  <PrivateRoute>
    <NotesContextProvider>
      <Outlet />
    </NotesContextProvider>
  </PrivateRoute>
);

export const PrivateRoutes = () => (
  <Route path="/" element={<PrivateLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    {/* Puedes agregar más rutas privadas aquí */}
  </Route>
);
