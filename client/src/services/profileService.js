import requester from "./requester.js"

const add = (profileData) => requester.post('/data/profiles', profileData)

const edit = async (userId, profileData) => {
    const profiles = await requester.get('/data/profiles');

    const myProfile = profiles.find(profile => profile._ownerId === userId);

    return requester.put(`/data/profiles/${myProfile._id}`, profileData);
}

const get = async (userId) => {
    const profiles = await requester.get('/data/profiles');
    const myProfile = profiles.find(profile => profile._ownerId === userId);

    if (!myProfile) {
        return;
    }

    return requester.get(`/data/profiles/${myProfile._id}`);
}

export default {
    add,
    edit,
    get
}