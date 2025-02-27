import { Link } from 'react-router-dom';

import styles from './DetailsAlbumItem.module.css';

export default function DetailsAlbumItem({
    album,
    isOwner
}) {
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
                <p>{album.description}</p>
            </div>

            {isOwner && (
                <div className={styles.buttons}>
                    <Link to={`/albums/${album._id}/edit`}>Edit</Link>
                    <button>Delete</button>
                </div>
            )}
        </>
    );
};