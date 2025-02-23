import requester from "./requester.js";

const BASE_PATH = '/data/albums';

const getAll = (offset, pageSize) => {
    const query = new URLSearchParams({
        sortBy: '_createdOn desc',
        offset,
        pageSize
    });

    const albums = requester.get(`${BASE_PATH}?${query}`);

    return albums;
};

const getLatest = () => {
    const query = new URLSearchParams({
        sortBy: '_createdOn desc',
        offset: 0,
        pageSize: 5
    });

    return requester.get(`/data/albums?${query}`);
};

export default {
    getAll,
    getLatest
};