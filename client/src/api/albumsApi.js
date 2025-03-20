import { useEffect, useState } from "react";
import requester from "../services/requester.js";

const BASE_PATH = '/data/albums';

export const useCreateAlbum = () => {
    const createAlbum = (albumData) => requester.post(BASE_PATH, albumData);

    return {
        createAlbum
    };
};

export const useGetAllAlbums = (offset, pageSize) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasNextPage, setHasNextPage] = useState(true);

    const query = new URLSearchParams({
        sortBy: '_createdOn desc',
        offset,
        pageSize: pageSize + 1
    });

    useEffect(() => {
        (async () => {
            try {
                const result = await requester.get(`${BASE_PATH}?${query}`);

                setAlbums(result.slice(0, pageSize));
                setHasNextPage(result.length > pageSize)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [offset]);

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
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const result = await requester.get(`${BASE_PATH}/${albumId}`);

                setAlbum(result);
            } catch (err) {
                setError(err.message);
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