import requester from "./requester.js";

const create = (albumId, email, comment) => {
    const newComment = requester.post('/data/comments', {
        albumId,
        email,
        comment
    });

    return newComment;
};

export default {
    create
}