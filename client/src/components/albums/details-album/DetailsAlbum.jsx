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

export default function DetailsAlbum() {
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const { albumId } = useParams();
    const { userId, isAuthenticated, email } = useContext(AuthContext);

    const isOwner = userId === album._ownerId;

    useEffect(() => {
        const offset = (currentPage - 1) * pageSize;

        (async () => {
            try {
                const resultAlbum = await albumService.getOne(albumId);
                const resultComments = await commentService.getAll(offset, pageSize, albumId);

                setHasNextPage(resultComments.length === pageSize);
                setComments(resultComments);
                setAlbum(resultAlbum);
                setLoading(false);
            } catch (err) {
                //TODO trycatch
                console.log(err.message);
            }
        })();
    }, [albumId, currentPage]);

    const handleAddComment = async (values) => {
        try {
            const newComment = await commentService.create(albumId, email, values.comment);

            setComments(state => [newComment, ...state]);
            
            setCurrentPage(1);
        } catch (err) {
            //TODO error handling
            console.log(err.message);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {loading && <Spinner />}

            {!loading && (
                <div className={styles.container}>
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
                </div>
            )}
        </>
    );
};