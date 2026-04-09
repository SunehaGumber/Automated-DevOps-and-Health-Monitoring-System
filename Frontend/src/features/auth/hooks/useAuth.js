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
        return true; // Send success signal back to the form
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async ({ email, otp }) => {
    setLoading(true);
    try {
      const response = await verifyEmail({ email, otp });
      setUser(response.user);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshToken = async () => {
    setLoading(true);
    try {
      const response = await refreshToken();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      setUser(null);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      setLoading(true);
      const response = await logoutAll();
      setUser(null);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async ({ email }) => {
    try {
      setLoading(true);
      const response = await resendOTP({email});
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async ({ email }) => {
    try {
      setLoading(true);
      const response = await forgotPassword({ email });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async ({ email, otp }) => {
    try {
      setLoading(true);
      const response = await verifyOTP({ email });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async ({ resetToken, password }) => {
    try {
      setLoading(true);
      const response = await changePassword({ resetToken, password });

      setUser(response.user);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        const response = await getMe();
        if (response?.user) setUser(response.user);
      } catch (err) {
        console.error("No active session found");
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
  };
};
