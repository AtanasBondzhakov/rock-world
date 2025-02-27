import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './DetailsAlbum.module.css';
import AuthContext from '../../../contexts/authContext.jsx';
import albumService from '../../../services/albumService.js';

import DetailsAlbumItem from './details-album-item/DetailsAlbumItem.jsx';
import Spinner from '../../spinner/Spinner.jsx';
import CommentAlbum from '../comment-album/CommentAlbum.jsx';
import commentService from '../../../services/commentService.js';

export default function DetailsAlbum() {
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    const { albumId } = useParams();
    const { userId, isAuthenticated, email } = useContext(AuthContext);

    const isOwner = userId === album._ownerId;

    useEffect(() => {
        (async () => {
            try {
                const resultAlbum = await albumService.getOne(albumId);

                setAlbum(resultAlbum);
                setLoading(false);
            } catch (err) {
                //TODO trycatch
                console.log(err.message);
            }
        })();
    }, [albumId]);

    const handleAddComment = async (values) => {
        try {
            const newComment = await commentService.create(albumId, email, values.comment);

            setComments(state => [newComment, ...state]);
        } catch (err) {
            //TODO error handling
            console.log(err.message);
        }
    }

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
                </div>
            )}
        </>
    );
};