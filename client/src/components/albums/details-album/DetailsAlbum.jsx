import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './DetailsAlbum.module.css';
import AuthContext from '../../../contexts/authContext.jsx';
import commentService from '../../../services/commentService.js';

import DetailsAlbumItem from './details-album-item/DetailsAlbumItem.jsx';
import Spinner from '../../spinner/Spinner.jsx';
import CommentAlbum from '../comment-album/CommentAlbum.jsx';
import CommentAlbumItem from '../comment-album/comment-album-item/CommentAlbumItem.jsx';
import Pagination from '../../pagination/Pagination.jsx';
import ErrorMessage from '../../error-message/ErrorMessage.jsx';
import ScrollToTop from '../../scroll-to-top/ScrollToTop.jsx';
import { useGetOneAlbum } from '../../../api/albumsApi.js';

export default function DetailsAlbum() {
    // const [album, setAlbum] = useState({});
    // const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    // const [error, setError] = useState('');

    const { albumId } = useParams();
    const { userId, isAuthenticated, email } = useContext(AuthContext);

    const { album, loading, error } = useGetOneAlbum(albumId);

    const isOwner = userId === album._ownerId;

    const handleGetComments = async () => {
        const offset = (currentPage - 1) * pageSize;

        try {
            const resultComments = await commentService.getAll(offset, pageSize + 1, albumId);

            setHasNextPage(resultComments.length > pageSize);
            setComments(resultComments.slice(0, pageSize));
        } catch (err) {
            setError(err.message);
        }
    };

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const resultAlbum = await albumService.getOne(albumId);

    //             handleGetComments();

    //             setAlbum(resultAlbum);
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     })();
    // }, [albumId, currentPage]);

    //TODO fix comments not load on mount

    const handleAddComment = async (values) => {
        try {
            await commentService.create(albumId, email, values.comment);

            handleGetComments();
        } catch (err) {
            setError(err.message);
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