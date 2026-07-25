import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  register,
  login,
  verifyEmail,
  refreshToken,
  logout,
  logoutAll,
  resendOTP,
  forgotPassword,
  verifyOTP,
  changePassword,
  getMe,
  change
} from "../services/auth.service";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const response = await register(data);
      if (response?.user) {
        setUser(response.user);
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await login({ email, password });
      setUser(response.user);
      return response;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async ({ email, otp }) => {
    
    try {
      const response = await verifyEmail({ email, otp });
      setUser(response.user);
      return response;
    } catch (err) {
      console.log(err);
      return false;
    } 
  };

  const handleRefreshToken = async () => {
   
    try {
       await refreshToken();
    } catch (err) {
      console.log(err);
    } 
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
     await logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      setLoading(true);
     await logoutAll();
      setUser(null);
    } catch (err) {
      
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async ({ email }) => {
    try {
      
      const response = await resendOTP({ email });
      return response;
    } catch (err) {
      console.log(err);
      return false;
    } 
  };

  const handleForgotPassword = async ({ email }) => {
    try {
      const response = await forgotPassword({ email });
      return response;
    } catch (err) {
       console.log(err);
      return false;
    } 
  };

  const handleVerifyOTP = async ({ email, otp }) => {
    try {
     
      const response = await verifyOTP({ email, otp });
      return response;
    } catch (err) {
       console.log(err);
    } 
  };

  const handleChangePassword = async ({password,confirmPassword},config) => {
    try {
   
      const response = await changePassword({password,confirmPassword },config);
      setUser(response?.user);
      return response;
    } catch (err) {
       console.log(err);
    } 
  };
  const handleChange = async ({currentPassword,newPassword,confirmPassword}) => {
    try {
    
    await change({ currentPassword, newPassword, confirmPassword });
      return true;
    } catch (err) {
      console.log(err);
      
    } 
  }
  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await getMe();
        if (response?.user) setUser(response.user);
      } catch (err) {
        console.error("No active session found",err);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);
    return {
        user,
        loading,
    handleRegister,
    handleChangePassword,
    handleLogin,
    handleLogout,
    handleLogoutAll,
    handleRefreshToken,
    handleVerifyOTP,
    handleVerifyEmail,
    handleResendOtp,
    handleForgotPassword,
    handleChange
  };
};

