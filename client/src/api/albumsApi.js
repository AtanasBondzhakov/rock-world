import requester from "../services/requester.js";

const BASE_PATH = '/data/albums';

export const useCreateAlbum = () => {
    const createAlbum = (albumData) => requester.post(BASE_PATH, albumData);

    return {
        createAlbum
    }
};