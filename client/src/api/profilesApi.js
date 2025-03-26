import { useEffect, useState } from "react";

import requester from "../services/requester";

const BASE_URL = '/data/profiles';

export const useCreateProfile = () => {
    const createProfile = (profileData) => requester.post(BASE_URL, profileData);

    return {
        createProfile
    }
};

export const useGetProfile = (userId) => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const query = new URLSearchParams({
            where: `_ownerId="${userId}"`
        });

        (async () => {
            try {
                const result = await requester.get(`${BASE_URL}?${query}`);

                setProfile(result[0]);
            } catch (error) {
                setError('Profile is currently unavailable.')
            } finally {
                setLoading(false);
            }
        })();
    }, [userId]);

    return {
        profile,
        error,
        loading
    }
};

export const useEditProfile = () => {
    const editProfile = async (userId, profileData) => {
        const profiles = await requester.get(BASE_URL);
        const profileResult = profiles.find(profile => profile._ownerId === userId);

        return requester.put(`${BASE_URL}/${profileResult._id}`, profileData);
    };

    return {
        editProfile
    }
};