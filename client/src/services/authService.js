import requester from "./requester.js"

const endpoint = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout'
}

const register = (email, password, username) => requester.post(endpoint.register, { email, password, username });

const login = (email, password) => requester.post(endpoint.login, { email, password });

const logout = () => requester.get(endpoint.logout);

export default {
    register,
    login,
    logout
};