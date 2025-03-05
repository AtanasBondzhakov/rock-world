const host = import.meta.env.VITE_API_URL;

const request = async (method, url, data) => {
    const option = {
        method,
        headers: {}
    }

    const token = localStorage.getItem('accessToken');

    if (token) {
        option.headers['X-Authorization'] = token;
    }

    if (data !== undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, option);
        if (!response.ok) {
            
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

const get = (url) => request('GET', url);
const post = (url, data) => request('POST', url, data);
const put = (url, data) => request('PUT', url, data);
const del = (url) => request('DELETE', url);

export default {
    get,
    post,
    put,
    del
}