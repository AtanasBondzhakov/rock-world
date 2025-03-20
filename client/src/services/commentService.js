import requester from "./requester.js";

const BASE_URL = '/data/comments';

// const create = (albumId, email, comment) => {
//     const newComment = requester.post(BASE_URL, {
//         albumId,
//         email,
//         comment
//     });

//     return newComment;
// };

const getAll = (offset, pageSize, albumId) => {
    const query = new URLSearchParams({
        sortBy: '_createdOn desc',
        offset,
        pageSize,
        where: `albumId="${albumId}"`,
    });

    const allComments = requester.get(`/data/comments?${query}`);
    
    return allComments;
} 

export default {
    // create,
    getAll
}