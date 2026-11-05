import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { authenticated } = useAuth();

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center text-mist font-mono text-sm">
        Checking session…
      </div>
    );
  }

  if (!authenticated) return <Navigate to="/admin/login" replace />;

  return children;
}
