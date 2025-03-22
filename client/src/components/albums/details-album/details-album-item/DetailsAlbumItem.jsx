import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './DetailsAlbumItem.module.css';
import { PATHS } from '../../../../constants.js';
import { toasterSuccess } from '../../../../utils/toaster-messages.js';
import { useDeleteAlbum } from '../../../../api/albumsApi.js';
import { useAddFavorite, useGetOneFavorite } from '../../../../api/favoritesApi.js';
import favoriteService from '../../../../services/favoriteService.js';

import DeleteAlbumModal from '../../delete-album-modal/DeleteAlbumModal.jsx';
import ErrorMessage from '../../../error-message/ErrorMessage.jsx';
import AuthContext from '../../../../contexts/authContext.jsx';

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export default function DetailsAlbumItem({
    album,
    isOwner
}) {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const { isAuthenticated, userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const { deleteAlbum } = useDeleteAlbum();
    const { addFavorite } = useAddFavorite();
    const { favoriteId, refetch } = useGetOneFavorite(album._id, userId);

    const handleDeleteButtonClick = () => {
        setShowModal(true);
    };

    const handleCancelButtonClick = () => {
        setShowModal(false);
    };

    const handleDeleteAlbum = async () => {
        const successMsg = 'Album deleted successfully';

        try {
            await deleteAlbum(album._id);

            if (favoriteId) {
                //TODO remove favorite from all users
                await favoriteService.remove(favoriteId);
            }

            toasterSuccess(successMsg);
            navigate(PATHS.Albums);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFavorite = async () => {
        try {
            if (!favoriteId) {
                await addFavorite(album, userId);
            } else {
                await favoriteService.remove(favoriteId);
            }

            refetch();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error && <ErrorMessage message={error} />}

            {!error && (
                <>
                    <div className={styles.main}>
                        <div className={styles.imgContainer}>
                            <img src={album.imageUrl} alt="" />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.heading}>
                                <h2>{album.title}</h2>
                                <h3>By {album.band}</h3>
                            </div>
                            <div className={styles.secondary}>
                                <p>Released: <span>{album.released}</span></p>
                                <p>Tracks count: <span>{album.trackCount}</span></p>
                                <p>Duration: <span>{album.duration} mins</span></p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <span>Description:</span>
                        <p>{album.description}</p>
                    </div>

                    {isAuthenticated && (
                        <div className={styles.buttons}>
                            {isOwner && (
                                <>
                                    <Link to={`/albums/${album._id}/edit`}>Edit</Link>
                                    <button onClick={handleDeleteButtonClick}>Delete</button>
                                </>
                            )}
                            <button className={styles.fav} onClick={handleFavorite}>
                                {favoriteId ? <FaHeart /> : <FaRegHeart />}
                            </button>
                        </div>
                    )}

                    {showModal &&
                        <DeleteAlbumModal
                            handleCancelButtonClick={handleCancelButtonClick}
                            handleDeleteAlbum={handleDeleteAlbum}
                        />}
                </>
            )}
        </div>
    );
};