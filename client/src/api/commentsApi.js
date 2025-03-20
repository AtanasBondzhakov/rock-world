import requester from "../services/requester.js";

const BASE_URL = '/data/comments';

export const useCreateComment = () => {
    const createComment = (albumId, comment) => requester.post(BASE_URL, { albumId, comment });

    return {
        createComment
    }
};