// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>; // hoặc spinner
  if (!user) return <Navigate to="/login" />;
  if (user.role_id === 2) return <Navigate to="/" />; // redirect nếu không phải admin
  return children;
}

export function LoginRouter({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>; // hoặc spinner
  if (user) return <Navigate to="/" />;
  return children;
}
