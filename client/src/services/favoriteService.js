import requester from "./requester";

const BASE_URL = '/data/favorites';

const add = (albumData, userId) => requester.post(BASE_URL, {albumData, userId});

const getAll = () => requester.get(BASE_URL);

const remove = (favoriteId) => requester.del(`${BASE_URL}/${favoriteId}`);

export default {
    add,
    getAll,
    remove
}