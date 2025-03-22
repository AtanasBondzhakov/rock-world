import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './DetailsAlbum.module.css';
import AuthContext from '../../../contexts/authContext.jsx';
import { useGetOneAlbum } from '../../../api/albumsApi.js';
import { useCreateComment, useGetComments } from '../../../api/commentsApi.js';

import DetailsAlbumItem from './details-album-item/DetailsAlbumItem.jsx';
import Spinner from '../../spinner/Spinner.jsx';
import CommentAlbum from '../comment-album/CommentAlbum.jsx';
import CommentAlbumItem from '../comment-album/comment-album-item/CommentAlbumItem.jsx';
import Pagination from '../../pagination/Pagination.jsx';
import ErrorMessage from '../../error-message/ErrorMessage.jsx';
import ScrollToTop from '../../scroll-to-top/ScrollToTop.jsx';

export default function DetailsAlbum() {
    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const { albumId } = useParams();
    const { userId, isAuthenticated, email } = useContext(AuthContext);

    const { album, loading, error } = useGetOneAlbum(albumId);
    const { createComment } = useCreateComment();

    const offset = (currentPage - 1) * pageSize;

    const { comments, setComments, error: commentsError, hasNextPage } = useGetComments(offset, pageSize, albumId);

    const isOwner = userId === album._ownerId;

    //TODO show comments when new is added
    //TODO stick errors in one state and show conditionally

    const handleAddComment = async (values) => {
        try {
            const newComment = await createComment(albumId, values.comment);

            setComments(prevState => [{ ...newComment, author: { email: 'Nasko' } }, ...prevState]);

            handleGetComments();
        } catch (err) {
            // setCommentError(err.message);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <ScrollToTop dependency={[currentPage, comments]} />

            <div className={styles.container}>
                {loading && <Spinner />}

                {error && <ErrorMessage message={error} />}

                {!loading && !error && (
                    <>
                        <h2>Album Details</h2>

                        <div className={styles.details}>
                            <div className={styles.wrapper}>
                                <div className={styles.albumContainer}>
                                    <DetailsAlbumItem album={album} isOwner={isOwner} />
                                </div>

                                {isAuthenticated &&
                                    <div className={styles.commentsContainer}>
                                        <CommentAlbum handleAddComment={handleAddComment} />
                                    </div>
                                }
                            </div>
                            <div className={styles.comments}>
                                {comments.length > 0
                                    ? <>
                                        <h2>Comments</h2>

                                        {comments.map(comment => <CommentAlbumItem key={comment._id} {...comment} />)}

                                        <Pagination
                                            currentPage={currentPage}
                                            hasNextPage={hasNextPage}
                                            handlePageChange={handlePageChange}
                                        />
                                    </>
                                    : <h2>No comments yet.</h2>
                                }
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};