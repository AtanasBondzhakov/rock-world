import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './DetailsAlbum.module.css';
import AuthContext from '../../../contexts/authContext.jsx';
import albumService from '../../../services/albumService.js';
import commentService from '../../../services/commentService.js';

import DetailsAlbumItem from './details-album-item/DetailsAlbumItem.jsx';
import Spinner from '../../spinner/Spinner.jsx';
import CommentAlbum from '../comment-album/CommentAlbum.jsx';
import CommentAlbumItem from '../comment-album/comment-album-item/CommentAlbumItem.jsx';
import Pagination from '../../pagination/Pagination.jsx';
import ErrorMessage from '../../error-message/ErrorMessage.jsx';

export default function DetailsAlbum() {
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [error, setError] = useState('');

    const { albumId } = useParams();
    const { userId, isAuthenticated, email } = useContext(AuthContext);

    const isOwner = userId === album._ownerId;

    useEffect(() => {
        const offset = (currentPage - 1) * pageSize;

        (async () => {
            try {
                //TODO fix if last items are exactly as pageSize
                const resultAlbum = await albumService.getOne(albumId);
                const resultComments = await commentService.getAll(offset, pageSize, albumId);

                setHasNextPage(resultComments.length === pageSize);
                setComments(resultComments);
                setAlbum(resultAlbum);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [albumId, currentPage]);

    const handleAddComment = async (values) => {
        const offset = (currentPage - 1) * pageSize;

        //TODO Fix fetching comments when new comments appear
        try {
            await commentService.create(albumId, email, values.comment);
            const resultComments = await commentService.getAll(offset, pageSize, albumId);

            setHasNextPage(resultComments.length === pageSize);
            setComments(resultComments);
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>


            <div className={styles.container}>
                {loading && <Spinner />}

                {error.length > 0 && (
                    <ErrorMessage message={error} />
                )}
                {(!loading && error.length === 0) && (
                    <>
                        <div className={styles.wrapper}>
                            <div className={styles.albumContainer}>
                                <DetailsAlbumItem album={album} isOwner={isOwner} />
                            </div>

                            {isAuthenticated &&
                                <div className={styles.commentContainer}>
                                    <CommentAlbum handleAddComment={handleAddComment} />
                                </div>
                            }
                        </div>
                        <div className={styles.comments}>
                            {comments.length > 0
                                ?
                                <>
                                    <h2>All Comments</h2>
                                    {comments.map(comment => <CommentAlbumItem key={comment._id} {...comment} />)}
                                    <Pagination
                                        currentPage={currentPage}
                                        hasNextPage={hasNextPage}
                                        handlePageChange={handlePageChange}
                                    />
                                </>
                                :
                                <h2>No comments yet.</h2>
                            }
                        </div>
                    </>
                )}
            </div>

        </>
    );
};