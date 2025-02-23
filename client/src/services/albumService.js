import requester from "./requester.js";

const BASE_PATH = '/data/albums';

const getAll = () => {
    const query = new URLSearchParams({
        sortBy: '_createdOn desc',
    });

    const albums = requester.get(`${BASE_PATH}?${query}`);

    return albums;
};

export default {
    getAll
};