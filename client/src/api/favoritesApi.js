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

    const fetchFavorite = async () => {
        try {
            const query = new URLSearchParams({
                where: `userId="${userId}"`
            });

            const result = await requester.get(`${BASE_URL}?${query}`);
            const favorite = result.find(fav => fav.albumData._id === albumId);

            setFavoriteId(favorite?._id);
        } catch (err) {
            //TODO fix error message
            console.error('Failed to fetch favorite:', err);
        }
    };

    useEffect(() => {
        fetchFavorite();
    }, [albumId, userId]);

    return {
        favoriteId,
        refetch: fetchFavorite
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

    useEffect(() => {
        (async () => {
            try {
                const query = new URLSearchParams({
                    where: `userId="${userId}"`
                });

                const result = await requester.get(`${BASE_URL}?${query}`);

                setMyFavorites(result)
            } catch (err) {
                //TODO error handling
            }
        })();
    }, [userId]);

    return {
        myFavorites
    }
}