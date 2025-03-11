import requester from "./requester.js"

const edit = async (userId, profileData) => {
    const profiles = await requester.get('/data/profiles');

    const myProfile = profiles.find(profile => profile._ownerId === userId);

    if (!myProfile) {
        return requester.post('/data/profiles', profileData);
    }

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
    edit,
    get
}