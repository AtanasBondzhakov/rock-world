import requester from "../services/requester.js";

const BASE_URL = '/data/favorites';

export const useAddFavorite = () => {
    const addFavorite = (albumData, userId) => requester.post(BASE_URL, { albumData, userId });

    return {
        addFavorite
    }
};