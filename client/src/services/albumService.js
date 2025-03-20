import requester from "./requester.js";

const BASE_PATH = '/data/albums';

// const getAll = (offset, pageSize) => {
//     const query = new URLSearchParams({
//         sortBy: '_createdOn desc',
//         offset,
//         pageSize
//     });

//     const albums = requester.get(`${BASE_PATH}?${query}`);

//     return albums;
// };

const getLatest = () => {
    const query = new URLSearchParams({
        sortBy: '_createdOn desc',
        offset: 0,
        pageSize: 5
    });

    return requester.get(`/data/albums?${query}`);
};

// const getOne = (albumId) => requester.get(`${BASE_PATH}/${albumId}`);

// const add = (albumData) => requester.post(BASE_PATH, albumData);

const edit = (albumId, albumData) => requester.put(`${BASE_PATH}/${albumId}`, albumData);

const remove = (albumId) => requester.del(`${BASE_PATH}/${albumId}`);

const search = (searchText) => {
    const query = new URLSearchParams({
        where: `title LIKE "${searchText}" OR band LIKE "${searchText}"`
    })
    return requester.get(`${BASE_PATH}?${query}`)
}

export default {
    // getAll,
    getLatest,
    // getOne,
    // add,
    edit,
    remove,
    search
};