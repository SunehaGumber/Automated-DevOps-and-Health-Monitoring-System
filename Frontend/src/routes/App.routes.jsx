import { createBrowserRouter } from 'react-router';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import OtpInput from '../features/auth/components/OTPinput';
import Home from '../features/auth/pages/Home';
export const router = createBrowserRouter([
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/register",
        element:<Register/>
    },
    {
        path: "/otp",
        element:<OtpInput/>
    },
    {
        path: '/',
        element:<Home/>
    }
]);