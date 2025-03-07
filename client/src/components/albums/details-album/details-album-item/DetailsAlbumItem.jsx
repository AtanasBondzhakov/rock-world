import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './DetailsAlbumItem.module.css';
import albumService from '../../../../services/albumService.js';
import { PATHS } from '../../../../constants.js';
import { toasterSuccess } from '../../../../utils/toaster-messages.js';

import DeleteAlbumModal from '../../delete-album-modal/DeleteAlbumModal.jsx';
import ErrorMessage from '../../../error-message/ErrorMessage.jsx';
import AuthContext from '../../../../contexts/authContext.jsx';
import favoriteService from '../../../../services/favoriteService.js';

export default function DetailsAlbumItem({
    album,
    isOwner
}) {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [favoriteId, setFavoriteId] = useState('');

    const { isAuthenticated, userId } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const favorites = await favoriteService.getAll();
                const myFavorite = favorites.find(fav => fav.albumId === album._id && fav.userId === userId);

                setFavoriteId(myFavorite?._id);
            } catch (err) {
                setError(err.message);
            }
        })();
    }, [album]);

    const handleDeleteButtonClick = () => {
        setShowModal(true);
    };

    const handleCancelButtonClick = () => {
        setShowModal(false);
    };

    const handleDeleteAlbum = async () => {
        const successMsg = 'Album deleted successfully';

        try {
            await albumService.remove(album._id);

            toasterSuccess(successMsg);

            navigate(PATHS.Albums);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFavorite = async () => {
        try {
            if (!favoriteId) {
                const newFavorite = await favoriteService.add(album._id, userId);
                setFavoriteId(newFavorite._id);

                return;
            }

            await favoriteService.remove(favoriteId)
            setFavoriteId('');
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
                                {favoriteId ? 'Remove from Favorites' : 'Add to Favorites'}
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