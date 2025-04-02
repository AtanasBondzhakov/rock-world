import requester from "../services/requester";

const endpoint = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout'
}

export const useRegister = () => {
    const register = (email, password, username) =>
        requester.post(
            endpoint.register,
            { email, password, username }
        );

    return {
        register
    }
};

export const useLogin = () => {
    const login = (email, password) =>
        requester.post(
            endpoint.login,
            { email, password }
        );

    return {
        login
    };
};

export const useLogout = () => {
    const logout = () => requester.get(endpoint.logout);

    return {
        logout
    }
};