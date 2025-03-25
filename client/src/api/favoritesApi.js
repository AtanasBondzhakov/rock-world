import { useEffect, useState } from "react";
import requester from "../services/requester.js";

const BASE_URL = '/data/favorites';

export const useAddFavorite = () => {
    const addFavorite = (albumData, userId) => requester.post(BASE_URL, { albumData, userId });

    return {
        addFavorite
    }
};

export const useGetOneFavorite = (albumId, userId) => {
    const [favoriteId, setFavoriteId] = useState(null);
    const [error, setError] = useState('');

    const fetchFavorite = async () => {
        try {
            const query = new URLSearchParams({
                where: `userId="${userId}"`
            });

            const result = await requester.get(`${BASE_URL}?${query}`);
            const favorite = result.find(fav => fav.albumData._id === albumId);

            setFavoriteId(favorite?._id);
        } catch (err) {
            setError('Failed to load favorite.');
        }
    };

    useEffect(() => {
        fetchFavorite();
    }, [albumId, userId]);

    return {
        favoriteId,
        refetch: fetchFavorite,
        error
    };
};

export const useRemoveFavorite = () => {
    const removeFavorite = (favoriteId) => requester.del(`${BASE_URL}/${favoriteId}`);

    return {
        removeFavorite
    }
};

export const useMyFavorites = (userId) => {
    const [myFavorites, setMyFavorites] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const query = new URLSearchParams({
                    where: `userId="${userId}"`
                });

                const result = await requester.get(`${BASE_URL}?${query}`);

                setMyFavorites(result)
            } catch (err) {
                setError('Failed to load favorites.')
            }
        })();
    }, [userId]);

    return {
        myFavorites,
        error
    }
};

export const useEditFavorite = () => {
    const editFavorite = (favoriteId, albumData, userId) => requester.put(`${BASE_URL}/${favoriteId}`, { albumData, userId });

    return {
        editFavorite
    }
};