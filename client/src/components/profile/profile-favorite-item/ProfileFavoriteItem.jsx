import { Link } from 'react-router-dom';

import styles from './ProfileFavoriteItem.module.css';

export default function ProfileFavoriteItem({
    _id,
    imageUrl,
    title,
    band
}) {
    return (
        <Link to={`/albums/${_id}/details`} className={styles.albumCard}>
                <img src={imageUrl} alt="album-cover" />
                <div className={styles.info}>
                    <h2>{title} by {band}</h2>
                </div>
        </Link>
    );
};