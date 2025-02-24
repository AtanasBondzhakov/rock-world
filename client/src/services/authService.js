import requester from "./requester.js"

const endpoint = {
    register: '/users/register',
}

const register = (email, password, username) => requester.post(endpoint.register, { email, password, username });

export default {
    register
};