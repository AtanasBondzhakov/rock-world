import { createContext } from "react";
import { useNavigate } from 'react-router-dom';

import usePersistedState from "../hooks/usePersistedState";
import { PATHS } from "../constants.js";
import authService from "../../services/authService.js";

const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = usePersistedState('auth', {});

    const navigate = useNavigate();

    const handleRegister = async (userData) => {
        try {
            const { password, ...userDetails } = await authService.register(userData.email, userData.password, userData.username);

            setAuth(userDetails);

            localStorage.setItem('accessToken', userDetails.accessToken);

            navigate(PATHS.Home);
        } catch (err) {
            //TODO error handling
            console.log(err);

        }
    };

    const authValues = {
        handleRegister,
        username: auth.username,
        email: auth.email,
        isAuthenticated: !!auth.email,
        userId: auth._id
    };

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContext.displayName = 'AuthContext';

export default AuthContext;