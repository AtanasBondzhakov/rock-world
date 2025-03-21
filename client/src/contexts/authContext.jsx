import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import usePersistedState from "../hooks/usePersistedState";
import { PATHS } from "../constants.js";
import authService from "../services/authService.js";
import { toasterSuccess } from "../utils/toaster-messages.js";
import profileService from "../services/profileService.js";

const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = usePersistedState('auth', {});
    const [registerError, setRegisterError] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setRegisterError('');
        setLoginError('');
    }, [location.pathname]);

    const handleRegister = async (userData) => {
        const successMsg = 'Register successful. You are now logged in.';

        try {
            const { password, ...userDetails } = await authService.register(userData.email, userData.password, userData.username);

            setAuth(userDetails);

            localStorage.setItem('accessToken', userDetails.accessToken);
            
            await profileService.add(userDetails);

            toasterSuccess(successMsg);
            navigate(PATHS.Home);
        } catch (err) {
            setRegisterError(err.message);
        }
    };

    const handleLogin = async (userData) => {
        const successMsg = `Login successful. Welcome back.`;

        try {
            const { password, ...userDetails } = await authService.login(userData.email, userData.password);

            setAuth(userDetails);

            localStorage.setItem('accessToken', userDetails.accessToken);

            toasterSuccess(successMsg);
            navigate(PATHS.Home);
        } catch (err) {
            setLoginError(err.message);
        }
    };

    const handleLogout = () => {
        const successMsg = `Logout successful.`;

        setAuth({});
        localStorage.removeItem('accessToken');
        toasterSuccess(successMsg);
        navigate(PATHS.Home);
    };

    const authValues = {
        handleRegister,
        handleLogin,
        handleLogout,
        username: auth.username,
        email: auth.email,
        isAuthenticated: !!auth.email,
        userId: auth._id,
        registerError,
        loginError
    };

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContext.displayName = 'AuthContext';

export default AuthContext;