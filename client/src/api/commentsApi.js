import { useCallback, useEffect, useState } from "react";
import requester from "../services/requester.js";

const BASE_URL = '/data/comments';

export const useCreateComment = () => {
    const createComment = (albumId, comment) => requester.post(BASE_URL, { albumId, comment });

    return {
        createComment
    }
};

export const useGetComments = (offset, pageSize, albumId) => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);

    const fetchComments = useCallback(async () => {
        const query = new URLSearchParams({
            sortBy: '_createdOn desc',
            offset,
            pageSize: pageSize + 1,
            where: `albumId="${albumId}"`,
            load: `author=_ownerId:users`
        });

        try {
            const result = await requester.get(`${BASE_URL}?${query}`);

            setComments(result.slice(0, pageSize));
            setHasNextPage(result.length > pageSize);
        } catch (err) {
            setError({
                message: err.message
            });
        }
    }, [albumId, offset]);

    const addComment = useCallback((newComment) => {
        setComments(prev => [newComment, ...prev]);
    }, []);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return {
        comments,
        addComment,
        error,
        hasNextPage,
        refetch: fetchComments
    }
};