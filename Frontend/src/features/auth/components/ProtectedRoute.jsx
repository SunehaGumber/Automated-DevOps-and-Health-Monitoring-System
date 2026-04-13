import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
    //   <div className="h-screen w-screen">
        <Spinner />
    //   </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
