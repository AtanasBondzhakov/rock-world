import { useEffect, useState } from "react";
import requester from "../services/requester.js";
import { formatDateString } from "../utils/dateUtil.js";

const BASE_PATH = '/data/albums';

export const useCreateAlbum = () => {
    const createAlbum = async (albumData) => {
        const data = {
            ...albumData,
            released: formatDateString(albumData.released)
        };

        const newAlbum = await requester.post(BASE_PATH, data);

        return newAlbum;
    }

    return {
        createAlbum
    };
};

export const useGetAllAlbums = (offset, pageSize) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        const query = new URLSearchParams({
            sortBy: '_createdOn desc',
            offset,
            pageSize: pageSize + 1
        });

        (async () => {
            try {
                const result = await requester.get(`${BASE_PATH}?${query}`);

                setAlbums(result.slice(0, pageSize));
                setHasNextPage(result.length > pageSize)
            } catch (err) {
                setError({
                    message: 'Albums are currently unavailable.'
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [offset, pageSize]);

    return {
        albums,
        loading,
        error,
        hasNextPage
    };
};

export const useGetOneAlbum = (albumId) => {
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const result = await requester.get(`${BASE_PATH}/${albumId}`);

                setAlbum(result);
            } catch (err) {
                setError({
                    message: err.message
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [albumId]);

    return {
        album,
        loading,
        error
    }
};

export const useGetLatestAlbums = () => {
    const [latestAlbums, setLatestAlbums] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const query = new URLSearchParams({
            sortBy: '_createdOn desc',
            offset: 0,
            pageSize: 5
        });

        (async () => {
            try {
                const result = await requester.get(`/data/albums?${query}`)

                setLatestAlbums(result);
            } catch (err) {
                setError({
                    message: 'Albums are currently unavailable.'
                });
            }
        })();
    }, []);

    return {
        latestAlbums,
        error
    }
};

export const useDeleteAlbum = () => {
    const deleteAlbum = (albumId) => requester.del(`${BASE_PATH}/${albumId}`);

    return {
        deleteAlbum
    }
};

export const useEditAlbum = () => {
    const editAlbum = (albumId, albumData) => requester.put(`${BASE_PATH}/${albumId}`, albumData);

    return {
        editAlbum
    }
};

export const useSearch = (searchQuery) => {
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const query = new URLSearchParams({
            where: `title LIKE "${searchQuery}" OR band LIKE "${searchQuery}"`
        });

        (async () => {
            try {
                const result = await requester.get(`${BASE_PATH}?${query}`);

                setSearchResult(result);
            } catch (err) {
                setError({
                    message: 'Albums are currently unavailable.'
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [searchQuery]);

    return {
        searchResult,
        loading,
        error
    }
};