import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../features/auth/pages/Home";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import ServerForm from "../features/server/pages/ServerForm";
import Dashboard from "../features/server/pages/Dashboard";
import ServerDetail from "../features/server/pages/ServerDetailPage";
import Profile from "../features/auth/pages/Profile";
import ForgotPassword from "../features/auth/pages/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/createServer",
    element: (
      <ProtectedRoute>
        <ServerForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/server/:id",
    element: (
      <ProtectedRoute>
        <ServerDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/forgotPassword",
    element: (

        <ForgotPassword/>
    )
  }
]);
