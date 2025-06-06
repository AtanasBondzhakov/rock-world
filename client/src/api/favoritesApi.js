import { useCallback, useEffect, useState } from "react";
import requester from "../services/requester.js";

const BASE_URL = '/data/favorites';

export const useAddFavorite = () => {
    const addFavorite = (
        albumId,
        title,
        band,
        imageUrl
    ) => {
        return requester.post(BASE_URL, { albumId, title, band, imageUrl });
    };

    return {
        addFavorite
    }
};

export const useGetOneFavorite = (albumId, userId) => {
    const [favoriteId, setFavoriteId] = useState(null);
    const [error, setError] = useState('');

    const fetchFavorite = useCallback(async () => {
        try {
            const query = new URLSearchParams({
                where: `_ownerId="${userId}" AND albumId="${albumId}"`
            });

            const favorite = await requester.get(`${BASE_URL}?${query}`);

            setFavoriteId(favorite.at(0)?._id);
        } catch (err) {
            setError('Failed to load favorite.');
        }
    }, [albumId, userId]);

    useEffect(() => {
        fetchFavorite();
    }, [fetchFavorite]);

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
                    where: `_ownerId="${userId}"`
                });

                const result = await requester.get(`${BASE_URL}?${query}`);

                setMyFavorites(result);
            } catch (err) {
                setError('Failed to load favorites.');
            }
        })();
    }, [userId]);

    const updateFavorites = (favoriteId) => {
        setMyFavorites(state => state.filter(fav => fav._id !== favoriteId));
    };

    return {
        myFavorites,
        error,
        updateFavorites
    }
};

export const useEditFavorite = () => {
    const editFavorite = (
        favoriteId,
        albumId,
        title,
        band,
        imageUrl
    ) => {
        return requester.put(`${BASE_URL}/${favoriteId}`, { albumId, title, band, imageUrl });
    }

    return {
        editFavorite
    }
};