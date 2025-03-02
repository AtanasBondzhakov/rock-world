import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './DetailsAlbumItem.module.css';
import albumService from '../../../../services/albumService.js';
import { PATHS } from '../../../../constants.js';
import { toasterSuccess } from '../../../../utils/toaster-messages.js';

import DeleteAlbumModal from '../../delete-album-modal/DeleteAlbumModal.jsx';


export default function DetailsAlbumItem({
    album,
    isOwner
}) {
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

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
            //TODO error handling
            console.log(err.message);
        }
    };
    return (
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

            {isOwner && (
                <div className={styles.buttons}>
                    <Link to={`/albums/${album._id}/edit`}>Edit</Link>
                    <button onClick={handleDeleteButtonClick}>Delete</button>
                </div>
            )}

            {showModal &&
                <DeleteAlbumModal
                    handleCancelButtonClick={handleCancelButtonClick}
                    handleDeleteAlbum={handleDeleteAlbum}
                />}
        </>
    );
};