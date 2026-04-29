import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <Spinner />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
