import { Link } from 'react-router-dom';
import styles from './AlbumItem.module.css';

export default function AlbumItem({
    _id,
    imageUrl,
    title,
    band,
    genre
}) {
    return (
        <div className={styles.albumCard}>
            <img src={imageUrl} alt="album-cover" />
            <div className={styles.info}>
                <h2>{title}</h2>
                <h3>by {band}</h3>
                <p>/{genre}/</p>
            </div>
            <Link to={`/albums/${_id}/details`} className={styles.bottom}>Details</Link>
        </div>
    );
};