import { API } from "./API";

export const register = async ({ username, email, password }) => {
    try {
        const response = await API.post('/api/auth/register', {
            username,email,password
        })
        return response.data;
    } catch (err) {
        console.error("Service Error:", err);
        throw err;
    }
}

export const login = async ({ email, password }) => {
    try {
        const response = await API.post('/api/auth/login', {
            email,password
        })
        if (response.data?.accessToken) {
            localStorage.setItem("accessToken", response.data?.accessToken);
            localStorage.setItem("isLogged", true);
        }
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const verifyEmail = async ({ email, otp })=>{
    try {
        const response = await API.post('/api/auth/verify-email', {
            email,otp
        })
        if (response.data?.accessToken) {
            localStorage.setItem("accessToken", response.data?.accessToken);
            localStorage.setItem("isLogged", true);
        }
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const refreshToken = async () => {
    try {
        const response = await API.get('/api/auth/refresh-token');
        if (response.data?.accessToken) {
            localStorage.setItem("accessToken", response.data?.accessToken);
        }
        return response.data; 
    } catch (err) {
        console.log(err);
    }
}

export const logout = async () => {
    try {
        const response = await API.patch('/api/auth/logout');
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLogged");
        delete axios.defaults.headers.common['Authorization'];
        return response.data;
        
    } catch (err) {
        console.log(err);
    }
}

export const logoutAll = async () => {
    try {
        const response = await API.patch('/api/auth/logoutall');
        localStorage.removeItem("accessToken");
         localStorage.removeItem("isLogged");
         delete axios.defaults.headers.common['Authorization'];
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const resendOTP = async ({ email }) => {
    try {
        const response = await API.post('/api/auth/resend-otp', { email })
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const forgotPassword = async ({ email })=>{
    try {
        const response = await API.post('api/auth/forgotPassword', { email });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const verifyOTP = async ({ email,otp }) => {
    try {
        const response = await API.post('/api/auth/verifyOTP', {
            email,
            otp
        });
         if (response.data?.resetToken) {
            localStorage.setItem("resetToken", response.data?.resetToken);
        }
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const changePassword = async ({password,confirmPassword },config) => {
    try {
        const response = await API.post('/api/auth/changePassword', {
            password,
            confirmPassword
        }, config);
        
        localStorage.removeItem("resetToken");

        if (response.data?.accessToken) {
            localStorage.setItem("accessToken", response.data?.accessToken);
            localStorage.setItem("isLogged", true);
        }
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getMe = async ()=>{
    try {
        const response = await API.get('/api/auth/getMe');
         if (response.data?.accessToken) {
            localStorage.setItem("accessToken", response.data?.accessToken);
        }
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const change = async ({currentPassword,newPassword,confirmPassword}) => {
    try {
        const response = await API.patch('/api/auth/change', {
            currentPassword,newPassword,confirmPassword
        })
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
