import { Link } from 'react-router-dom';

import styles from './ProfileFavoriteItem.module.css';
import { useGetOneFavorite } from '../../../api/favoritesApi.js';

export default function ProfileFavoriteItem({
    albumId,
    title,
    band,
    imageUrl,
    onRemove,
    userId
}) {
    const { favoriteId } = useGetOneFavorite(albumId, userId);

    return (
        <div className={styles.container}>
            <Link to={`/albums/${albumId}/details`} className={styles.albumCard}>
                <img src={imageUrl} alt="album-cover" />
            </Link>
            <div className={styles.info}>
                <h2>{title} by {band}</h2>
            </div>

            <button onClick={() => onRemove(favoriteId)}>Remove</button>
        </div>
    );
};